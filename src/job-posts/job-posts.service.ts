import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPost } from '../entities/job-post.entity';
import { Auctioneer } from '../entities/auctioneer.entity';
import { Bidder } from '../entities/bidder.entity';
import { CreateJobPostDto } from './dto/create-job-post.dto';
import { FilterJobPostsDto } from './dto/filter-job-posts.dto';

@Injectable()
export class JobPostsService {
  constructor(
    @InjectRepository(JobPost)
    private jobPostRepository: Repository<JobPost>,
    @InjectRepository(Auctioneer)
    private auctioneerRepository: Repository<Auctioneer>,
    @InjectRepository(Bidder)
    private bidderRepository: Repository<Bidder>,
  ) {}

  async createJobPost(userId: number, createJobPostDto: CreateJobPostDto): Promise<JobPost> {
    const auctioneer = await this.auctioneerRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!auctioneer) {
      throw new UnauthorizedException('Only auctioneers can create job posts');
    }

    const jobPost = this.jobPostRepository.create({
      ...createJobPostDto,
      auctioneer,
    });

    return this.jobPostRepository.save(jobPost);
  }

  async getJobPostsByAuctioneer(userId: number): Promise<JobPost[]> {
    const auctioneer = await this.auctioneerRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!auctioneer) {
      throw new NotFoundException('Auctioneer not found');
    }

    return this.jobPostRepository.find({
      where: { auctioneer: { id: auctioneer.id } },
      relations: ['auctioneer', 'auctioneer.user', 'bids'],
      order: {
        bid_end_date: 'DESC',
      },
    });
  }

  async getAllJobPosts(page: number = 1, limit: number = 10): Promise<{ data: JobPost[]; total: number; page: number; totalPages: number }> {
    const [jobPosts, total] = await this.jobPostRepository.findAndCount({
      relations: ['auctioneer', 'auctioneer.user', 'bids'],
      order: {
        bid_end_date: 'DESC',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: jobPosts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getJobPostsForBidder(userId: number, filterDto: FilterJobPostsDto): Promise<JobPost[]> {
    const bidder = await this.bidderRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!bidder) {
      throw new UnauthorizedException('Only bidders can access this endpoint');
    }

    if (!bidder.latitude || !bidder.longitude) {
      throw new BadRequestException('Bidder location not set');
    }

    const radius = filterDto.radius || 7; // Default 7 km
    const kmToRadian = radius / 6371; // Earth's radius in km

    // Create query builder
    let query = this.jobPostRepository
      .createQueryBuilder('jobPost')
      .leftJoinAndSelect('jobPost.auctioneer', 'auctioneer')
      .leftJoinAndSelect('jobPost.bids', 'bids');

    // Apply location filter using Haversine formula
    query = query
      .where(
        `(
          6371 * acos(
            cos(radians(:latitude)) * 
            cos(radians(ST_X(jobPost.location::geometry))) * 
            cos(radians(ST_Y(jobPost.location::geometry)) - radians(:longitude)) + 
            sin(radians(:latitude)) * 
            sin(radians(ST_X(jobPost.location::geometry)))
          )
        ) <= :radius`,
        {
          latitude: bidder.latitude,
          longitude: bidder.longitude,
          radius,
        },
      );

    // Apply boat length filter if provided
    if (filterDto.boatLengthFrom !== undefined) {
      query = query.andWhere('jobPost.boatLength >= :boatLengthFrom', {
        boatLengthFrom: filterDto.boatLengthFrom,
      });
    }

    if (filterDto.boatLengthTo !== undefined) {
      query = query.andWhere('jobPost.boatLength <= :boatLengthTo', {
        boatLengthTo: filterDto.boatLengthTo,
      });
    }

    // Apply additional services filter if provided
    if (filterDto.additionalServices) {
      const services = filterDto.additionalServices.split(',').map(s => s.trim());
      if (services.length > 0) {
        query = query.andWhere('jobPost.additionalServices @> :services', {
          services,
        });
      }
    }

    // Execute query
    return query.getMany();
  }
}
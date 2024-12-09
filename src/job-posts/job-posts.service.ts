import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPost } from '../entities/job-post.entity';
import { Auctioneer } from '../entities/auctioneer.entity';
import { CreateJobPostDto } from './dto/create-job-post.dto';

@Injectable()
export class JobPostsService {
  constructor(
    @InjectRepository(JobPost)
    private jobPostRepository: Repository<JobPost>,
    @InjectRepository(Auctioneer)
    private auctioneerRepository: Repository<Auctioneer>,
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
    });

    if (!auctioneer) {
      throw new NotFoundException('Auctioneer not found');
    }

    return this.jobPostRepository.find({
      where: { auctioneer: { id: auctioneer.id } },
      relations: ['auctioneer'],
    });
  }
}
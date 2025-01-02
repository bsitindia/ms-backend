import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPost } from '../entities/job-post.entity';
import { Auctioneer } from '../entities/auctioneer.entity';
import { Bidder } from '../entities/bidder.entity';
import { JobPostsController } from './job-posts.controller';
import { JobPostsService } from './job-posts.service';
import { JobPostQueryService } from './job-post-query.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobPost, Auctioneer, Bidder])],
  controllers: [JobPostsController],
  providers: [JobPostsService, JobPostQueryService],
})
export class JobPostsModule {}  
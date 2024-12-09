import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPost } from '../entities/job-post.entity';
import { Auctioneer } from '../entities/auctioneer.entity';
import { Bidder } from '../entities/bidder.entity';
import { JobPostsController } from './job-posts.controller';
import { JobPostsService } from './job-posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobPost, Auctioneer, Bidder])],
  controllers: [JobPostsController],
  providers: [JobPostsService],
})
export class JobPostsModule {}  
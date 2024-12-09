import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPost } from '../entities/job-post.entity';
import { Auctioneer } from '../entities/auctioneer.entity';
import { JobPostsController } from './job-posts.controller';
import { JobPostsService } from './job-posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobPost, Auctioneer])],
  controllers: [JobPostsController],
  providers: [JobPostsService],
})
export class JobPostsModule {}
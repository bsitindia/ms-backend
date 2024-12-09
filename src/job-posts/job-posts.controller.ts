import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { JobPostsService } from './job-posts.service';
import { CreateJobPostDto } from './dto/create-job-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('jobpost')
@UseGuards(JwtAuthGuard)
export class JobPostsController {
  constructor(private readonly jobPostsService: JobPostsService) {}

  @Post()
  async createJobPost(@Request() req, @Body() createJobPostDto: CreateJobPostDto) {
    return this.jobPostsService.createJobPost(req.user.userId, createJobPostDto);
  }

  @Get('list')
  async getMyJobPosts(@Request() req) {
    return this.jobPostsService.getJobPostsByAuctioneer(req.user.userId);
  }
  
}
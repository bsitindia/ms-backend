import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { User } from './entities/user.entity';
import { Auctioneer } from './entities/auctioneer.entity';
import { JobPost } from './entities/job-post.entity';
import { JobPostsModule } from './job-posts/job-posts.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'ms_backend',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      entities: [
        User,Auctioneer,JobPost,
      ],
      synchronize: true,
    }),
    AuthModule, JobPostsModule,
  ],
})
export class AppModule {}
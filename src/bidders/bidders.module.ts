import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BiddersController } from './bidders.controller';
import { BiddersService } from './bidders.service';
import { Bidder } from '../entities/bidder.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bidder, User])],
  controllers: [BiddersController],
  providers: [BiddersService],
})
export class BiddersModule {}
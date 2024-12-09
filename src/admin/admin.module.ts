import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Auctioneer } from '../entities/auctioneer.entity';
import { AdminController } from './controllers/admin.controller';
import { AuctioneerController } from './controllers/auctioneer.controller';
import { AdminService } from './services/admin.service';
import { AuctioneerService } from './services/auctioneer.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Auctioneer]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AdminController, AuctioneerController],
  providers: [AdminService, AuctioneerService,],
})
export class AdminModule {}
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../entities/user.entity';
import { Auctioneer } from '../../entities/auctioneer.entity';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Auctioneer)
    private auctioneerRepository: Repository<Auctioneer>,
    private jwtService: JwtService,
  ) {}

  async validateAdmin(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email, user_type: 0 },
    });

    if (user && await bcrypt.compare(loginDto.password, user.password)) {
      const token = this.jwtService.sign({ sub: user.id, email: user.email });
      return { token };
    }
    throw new UnauthorizedException();
  }

  async getDashboardStats() {
    const [userCount, auctioneerCount] = await Promise.all([
      this.userRepository.count(),
      this.auctioneerRepository.count(),
    ]);

    return {
      users: userCount,
      auctioneers: auctioneerCount,
    };
  }
}
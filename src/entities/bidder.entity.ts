import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Bid } from './bid.entity';
import { Job } from './job.entity';

@Entity()
export class Bidder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  bio_discription: string;

  @Column()
  contact_number: string;

  @Column()
  address: string;

  // @ManyToOne(() => User, user => user.bidder)
  // user: User;

  @OneToMany(() => Bid, bid => bid.bidder)
  bids: Bid[];

  @OneToMany(() => Job, job => job.bidder)
  jobs: Job[];
}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Auctioneer } from './auctioneer.entity';
import { Bidder } from './bidder.entity';
import { Review } from './review.entity';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  job: string;

  // @ManyToOne(() => Auctioneer, auctioneer => auctioneer.jobs)
  // auctioneer: Auctioneer;

  @ManyToOne(() => Bidder, bidder => bidder.jobs)
  bidder: Bidder;

  @Column()
  job_start_date: Date;

  @Column()
  job_end_date: Date;

  @Column()
  payment_amount: number;

  @Column()
  payment_status: string;

  @OneToMany(() => Review, review => review.job)
  reviews: Review[];
}
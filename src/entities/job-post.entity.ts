

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Auctioneer } from './auctioneer.entity';
// import { Bid } from './bid.entity';

@Entity()
export class JobPost {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Auctioneer, auctioneer => auctioneer.jobPosts)
  auctioneer: Auctioneer;

  @Column({ nullable: false, default:"20" })
  boatLength: string;

  @Column("text", { array: true })
  additionalServices: string[];  

  @Column({ nullable: true })
  notes: string;

  @Column('json', { nullable: true })
  location: {
    latitude: number;
    longitude: number;
    dockNumber: string;
    address: string;
    placeId: string;
  };

  @Column({default:1,nullable:false})
  dirtinessLevel:number;

  @Column({ nullable: true })
  preferredDate: string;

  @Column({ nullable: true })
  max_bid_amount: number;

  @Column({ nullable: true })
  min_bid_amount: number;

  @Column({ nullable: true })
  bid_start_date: Date;

  @Column({ nullable: true })
  bid_end_date: Date;

  @Column({ nullable: true })
  job_start_date: Date;

  @Column({ nullable: true })
  job_end_date: Date;

  // @OneToMany(() => Bid, bid => bid.job_post)
  // bids: Bid[];
}
import { Trip } from 'src/trips/entity/trip.entity';
import {
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index(['name', 'country', 'state'], { unique: true })
@Entity('city')
export class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column({ nullable: true })
  imgUrl?: string;

  @Column({ nullable: true })
  state?: string;

  @Column({ type: 'float', nullable: true })
  lat?: number;

  @Column({ type: 'float', nullable: true })
  lon?: number;

  @ManyToMany(() => Trip, (trip) => trip.cities)
  trips: Trip[];
}

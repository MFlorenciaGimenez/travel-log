import { City } from 'src/city/entity/city.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('trips')
export class Trip {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  description: string;

  @Column({ default: true })
  isPublic: Boolean;

  @ManyToMany(() => City, (city) => city.trips, { cascade: true })
  @JoinTable()
  cities: City[];
}

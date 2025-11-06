import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('city')
export class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column({ nullable: true })
  imgUrl?: string;

  @Column({ nullable: true })
  state?: string;

  @Column({ type: 'float', nullable: true })
  lat?: number;
}

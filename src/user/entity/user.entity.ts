import { Trip } from 'src/trips/entity/trip.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  authType: 'jwt' | 'google';

  @Column({ nullable: true })
  birthDate?: string;

  @Column({ nullable: true })
  avatarUrl?: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({
    type: 'enum',
    enum: ['user', 'admin', 'moderator', 'tester'],
    default: 'user',
  })
  role: string;
  
  @OneToMany(() => Trip, (trip) => trip.user)
  trips: Trip[];

  //   @OneToMany(() => WishlistCity, (city) => city.user)
  //   wishlist: WishlistCity[];
}

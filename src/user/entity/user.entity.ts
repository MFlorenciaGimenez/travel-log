import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
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

  //   @OneToMany(() => Trip, (trip) => trip.user)
  //   trips: Trip[];

  //   @OneToMany(() => WishlistCity, (city) => city.user)
  //   wishlist: WishlistCity[];
}

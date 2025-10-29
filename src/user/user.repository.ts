import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateUserDto } from './dto/updateUser';
import { SaveUserPayload } from './types/saveUserPayload.type';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async saveUser(data: SaveUserPayload): Promise<User> {
    const newUser = this.userRepo.create(data);
    return this.userRepo.save(newUser);
  }

  async getUsers() {
    return await this.userRepo.find();
  }

  async findUserById(id: string) {
    const user = await this.userRepo.findOneBy({ id });
    return user;
  }

  async updateProfile(
    userId: string,
    dto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.userRepo.update(userId, dto);
  }

  async findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }
}

import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/updateUser';
import { User } from './entity/user.entity';
import { SaveUserPayload } from './types/saveUserPayload.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  saveUser(data: SaveUserPayload): Promise<User> {
    const newUser = this.userRepo.create(data);
    return this.userRepo.save(newUser);
  }

  getUsers() {
    return this.userRepo.find();
  }

  findUserById(id: string) {
    return this.userRepo.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'bio', 'country'],
    });
  }

  findUserByIdWithPassword(id: string) {
    return this.userRepo.findOne({
      where: { id },
      select: ['id', 'password'],
    });
  }

  updateProfile(userId: string, dto: UpdateUserDto) {
    return this.userRepo.update(userId, dto);
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  update(id: string, data: Partial<User>) {
    return this.userRepo.update(id, data);
  }
}

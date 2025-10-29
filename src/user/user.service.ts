import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UpdateUserDto } from './dto/updateUser';
import { CreateUserDto } from './dto/createUser';
import * as bcrypt from 'bcrypt';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUser(id: string) {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new BadRequestException('email already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.userRepository.saveUser({
      ...dto,
      password: hashedPassword,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async getUsers() {
    const users = await this.userRepository.getUsers();
    return users;
  }

  async updateProfile(userId: string, dto: UpdateUserDto) {
    const result = await this.userRepository.updateProfile(userId, dto);
    if (result.affected === 0) {
      throw new NotFoundException('user not found');
    }
    return this.userRepository.findUserById(userId);
  }
}

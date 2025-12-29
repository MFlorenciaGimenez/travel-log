import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/createUser';
import { LoginUserDto } from 'src/user/dto/loginUser';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async signUp(dto: CreateUserDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (user) {
      throw new BadRequestException('Email already registered');
    }
    const newUser = await this.userService.create(dto);

    const payload = { sub: newUser.id, email: newUser.email };
    const token = this.jwtService.sign(payload);

    const safeUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };
    return {
      success: true,
      message: 'User created successfully',
      data: { user: safeUser, access_token: token },
    };
  }

  async signIn(credential: LoginUserDto) {
    const { email, password } = credential;

    const user = await this.userService.findByEmailWithPassword(email);
    if (!user) {
      throw new UnauthorizedException('invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('invalid credentials');
    }
    const userPayload = {
      sub: user.id,
      email: user.email,
    };
    const token = this.jwtService.sign(userPayload);
    return {
      success: true,
      message: 'Login successful',
      data: { access_token: token },
    };
  }
}

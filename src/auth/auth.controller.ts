import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/createUser';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/singup')
  singUp(@Body() dto: CreateUserDto) {
    return this.authService.singUp(dto);
  }
}

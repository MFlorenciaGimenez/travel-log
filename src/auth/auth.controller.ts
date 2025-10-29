import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/createUser';
import { LoginUserDto } from 'src/user/dto/loginUser';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signup')
  signUp(@Body() dto: CreateUserDto) {
    return this.authService.signUp(dto);
  }

  @Post('/signin')
  signIn(@Body() credential: LoginUserDto) {
    return this.authService.signIn(credential);
  }
}

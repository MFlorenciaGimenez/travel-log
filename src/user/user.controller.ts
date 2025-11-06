import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser';
import type { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/common/utils/currentUser.decorator';
import { UpdatePasswordDto } from './dto/updatePassword';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //Im using this path to show my profile
  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  async getMe(@CurrentUser() user: any) {
    return this.userService.findUser(user.id);
  }
  //upload my profile information
  @UseGuards(JwtAuthGuard)
  @Patch('/me')
  updateProfile(@Req() req: Request, @Body() dto: UpdateUserDto) {
    const userId = req.user.id;
    return this.userService.updateProfile(userId, dto);
  }
  //change my password
  @UseGuards(AuthGuard('jwt'))
  @Patch('/me/password')
  changePassword(@CurrentUser() user: any, @Body() dto: UpdatePasswordDto) {
    return this.userService.changePassword(user.id, dto);
  }

  //to get others users public info
  @Get(':id')
  findUser(@Param('id') id: string) {
    return this.userService.findUser(id);
  }
}

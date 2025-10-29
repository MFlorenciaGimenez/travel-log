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
import { RolesGuard } from 'src/auth/guards/role.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/utils/roles.decorator';
import { CurrentUser } from 'src/common/utils/currentUser.decorator';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  async getMe(@CurrentUser() user: any) {
    return this.userService.findUser(user.id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Get('/users')
  getUsers() {
    return this.userService.getUsers();
  }
  @Get(':id')
  findUser(@Param('id') id: string) {
    return this.userService.findUser(id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  updateProfile(@Req() req: Request, @Body() dto: UpdateUserDto) {
    const userId = req.user.id;
    return this.userService.updateProfile(userId, dto);
  }
}

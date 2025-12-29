import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser';
import type { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/common/utils/currentUser.decorator';
import { UpdatePasswordDto } from './dto/updatePassword';

@ApiTags('users')
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
    schema: {
      example: {
        id: 'uuid',
        name: 'John Doe',
        email: 'john@example.com',
        bio: 'Travel enthusiast',
        country: 'USA',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getMe(@CurrentUser() user: any) {
    return this.userService.findUser(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/me')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update user profile' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'Profile updated successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  updateProfile(@Req() req: Request, @Body() dto: UpdateUserDto) {
    const userId = req.user.id;
    return this.userService.updateProfile(userId, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/me/password')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Change user password' })
  @ApiBody({ type: UpdatePasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Password changed successfully',
    schema: {
      example: {
        message: 'Password updated successfully',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Current password incorrect or new password same as current' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  changePassword(@CurrentUser() user: any, @Body() dto: UpdatePasswordDto) {
    return this.userService.changePassword(user.id, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user public information by ID' })
  @ApiParam({ name: 'id', description: 'User UUID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'User information retrieved successfully',
    schema: {
      example: {
        id: 'uuid',
        name: 'John Doe',
        email: 'john@example.com',
        bio: 'Travel enthusiast',
        country: 'USA',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  findUser(@Param('id') id: string) {
    return this.userService.findUser(id);
  }
}

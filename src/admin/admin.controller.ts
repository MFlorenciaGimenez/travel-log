import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/common/utils/roles.decorator';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles('admin')
  // @Get('/users')
  // @ApiBearerAuth('JWT-auth')
  // @ApiOperation({ summary: 'Get all users (Admin only)' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'List of all users',
  // })
  // @ApiResponse({ status: 401, description: 'Unauthorized' })
  // @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  // getUsers() {
  //   return this.adminService.getUsers();
  // }
}

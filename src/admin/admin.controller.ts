import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/common/utils/roles.decorator';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  //   @Roles('admin')
  //   @Get('/users')
  //   getUsers() {
  //     return this.adminService.getUsers();
  //   }
}

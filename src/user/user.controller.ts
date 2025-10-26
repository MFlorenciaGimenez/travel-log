import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  private readonly(userService: UserService) {}
}

import 'express-serve-static-core';
import { User } from 'src/user/entity/user.entity';

declare module 'express-serve-static-core' {
  export interface Request {
    cookies?: Record<string, any>;
    user: User;
  }
}

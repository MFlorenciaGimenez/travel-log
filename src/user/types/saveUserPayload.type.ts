import { CreateUserDto } from '../dto/createUser';
import { User } from '../entity/user.entity';

export type SaveUserPayload = Omit<CreateUserDto, 'password'> & {
  password: User['password'];
};

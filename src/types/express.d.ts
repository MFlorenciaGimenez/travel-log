import { IUserInRequest } from 'src/common/utils/userRequest.interface';

declare global {
  namespace Express {
    interface Request {
      user: IUserInRequest;
    }
  }
}

import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Match } from 'src/common/utils/match.decorator';

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Match('newPassword', { message: 'password do not match' })
  confirmPassword: string;
}

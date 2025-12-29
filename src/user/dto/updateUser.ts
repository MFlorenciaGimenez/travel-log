import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User birthdate',
    example: '1990-01-15',
    required: false,
  })
  @IsOptional()
  @IsString()
  birthdate?: string;

  @ApiProperty({
    description: 'User biography',
    example: 'Travel enthusiast and adventure seeker',
    required: false,
  })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({
    description: 'User country',
    example: 'United States',
    required: false,
  })
  @IsOptional()
  @IsString()
  country?: string;
}

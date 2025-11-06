import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddCityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsOptional()
  imgUrl: string;
}

import { Optional } from '@nestjs/common';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTripDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @Optional()
  isPublic?: boolean = true;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  cities: string[];
}

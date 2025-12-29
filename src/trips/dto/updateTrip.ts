import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTripDto {
  @ApiProperty({
    description: 'Trip title',
    example: 'Summer in Paris',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  title?: string;

  @ApiProperty({
    description: 'Trip start date',
    example: '2024-06-01',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiProperty({
    description: 'Trip end date',
    example: '2024-06-15',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiProperty({
    description: 'Trip description',
    example: 'An amazing trip through Europe',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Whether the trip is public',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;

  @ApiProperty({
    description: 'Array of city IDs',
    example: ['uuid1', 'uuid2'],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  cities?: string[];
}


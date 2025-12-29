import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CityService } from './city.service';

@ApiTags('cities')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  @ApiOperation({ summary: 'Get all cities' })
  @ApiResponse({
    status: 200,
    description: 'List of all cities',
    schema: {
      example: [
        {
          id: 'uuid',
          name: 'Paris',
          country: 'France',
          state: 'Île-de-France',
          lat: 48.8566,
          lon: 2.3522,
          imgUrl: 'https://example.com/paris.jpg',
        },
      ],
    },
  })
  async getCity() {
    return this.cityService.getCity();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search cities by name' })
  @ApiQuery({
    name: 'query',
    description: 'Search query (city name)',
    type: String,
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'List of matching cities',
  })
  async searchCity(@Query('query') query: string) {
    return this.cityService.searchCity(query);
  }

  @Get('popular')
  @ApiOperation({ summary: 'Get popular cities' })
  @ApiResponse({
    status: 200,
    description: 'List of popular cities',
  })
  async getPopularCities() {
    return this.cityService.getPopularCities();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get city by ID' })
  @ApiParam({ name: 'id', description: 'City UUID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'City information retrieved successfully',
    schema: {
      example: {
        id: 'uuid',
        name: 'Paris',
        country: 'France',
        state: 'Île-de-France',
        lat: 48.8566,
        lon: 2.3522,
        imgUrl: 'https://example.com/paris.jpg',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'City not found' })
  async getCityById(@Param('id') id: string) {
    return this.cityService.getCityById(id);
  }
}

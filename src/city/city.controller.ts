import { Controller, Get, Param, Query } from '@nestjs/common';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async getCity() {
    return this.cityService.getCity();
  }

  @Get('search')
  async searchCity(@Query('query') query: string) {
    return this.cityService.searchCity(query);
  }

  @Get('popular')
  async getPopularCities() {
    return this.cityService.getPopularCities();
  }

  @Get(':id')
  async getCityById(@Param('id') id: string) {
    return this.cityService.getCityById(id);
  }
}

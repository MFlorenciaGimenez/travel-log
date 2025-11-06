import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CityService } from './city.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/common/utils/roles.decorator';
import { AddCityDto } from './dto/addCity';

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

  @Get(':id')
  async getCityById(@Param() id: string) {
    return this.cityService.getCityById(id);
  }

  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles('admin')
  // @Post()
  // async addCity(@Body() dto: AddCityDto) {
  //   return this.cityService.addCity(dto);
  // }
}

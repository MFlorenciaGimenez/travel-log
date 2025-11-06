import { Injectable } from '@nestjs/common';
import { CityRepository } from './city.repository';

@Injectable()
export class CityService {
  constructor(private readonly cityRepository: CityRepository) {}

  async getCity() {
    const cities = await this.cityRepository.getCities();
    return cities;
  }

  async searchCity(query: string) {
    return this.cityRepository.searchCity(query);
  }

  async getCityById(id: string) {
    return this.cityRepository.getCityById(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { City } from './entity/city.entity';

@Injectable()
export class CityRepository {
  constructor(
    @InjectRepository(City)
    private readonly cityRepo: Repository<City>,
  ) {}

  getCities() {
    return this.cityRepo.find();
  }

  searchCity(query: string) {
    return this.cityRepo.find({
      where: [{ name: ILike(`%${query}%`) }, { country: ILike(`%${query}%`) }],
      take: 40,
    });
  }

  getCityById(id: string) {
    return this.cityRepo.findOne({ where: { id } });
  }
}

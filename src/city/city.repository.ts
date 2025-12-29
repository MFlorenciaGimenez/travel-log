import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import { City } from './entity/city.entity';

@Injectable()
export class CityRepository {
  constructor(
    @InjectRepository(City)
    private readonly cityRepo: Repository<City>,
  ) {}

  findAll() {
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

  async findCitiesByIds(ids: string[]) {
    return await this.cityRepo.findBy({
        id: In(ids) 
    });
}

  async getPopularCities(limit = 10) {
    const result = await this.cityRepo
      .createQueryBuilder('city')
      .leftJoin('city.trips', 'trip')
      .addSelect('COUNT(trip.id)', 'tripCount')
      .groupBy('city.id')
      .orderBy('tripCount', 'DESC')
      .limit(limit)
      .getRawAndEntities();

    return result.entities.map((city, i) => ({
      ...city,
      tripCount: Number(result.raw[i].tripCount),
    }));
  }
}

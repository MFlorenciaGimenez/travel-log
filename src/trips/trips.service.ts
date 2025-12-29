import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { CityRepository } from 'src/city/city.repository';
import { TripRepository } from './trip.repository';
import { CreateTripDto } from './dto/createTrip';
import { UpdateTripDto } from './dto/updateTrip';
import { City } from 'src/city/entity/city.entity';

@Injectable()
export class TripsService {
  constructor(
    private readonly tripsRepository: TripRepository,
    private readonly cityRepository: CityRepository,
  ) {}

  async create(createTripDto: CreateTripDto, userId: string) {
    const cityPromises = createTripDto.cities.map((id) =>
      this.cityRepository.getCityById(id),
    );
    const citiesResults = await Promise.all(cityPromises);
    const cities = citiesResults.filter(
      (city): city is City => city !== null,
    );

    if (cities.length === 0) {
      throw new BadRequestException('At least one valid city is required');
    }

    return this.tripsRepository.createTrip(createTripDto, userId, cities);
  }

  async findAll(userId: string) {
    return this.tripsRepository.findAllByUserId(userId);
  }

  async findOne(id: string) {
    const trip = await this.tripsRepository.findOneById(id);
    if (!trip) {
      throw new NotFoundException('Trip not found');
    }
    return trip;
  }

  async update(id: string, updateTripDto: UpdateTripDto, userId: string) {
    // Verify ownership
    const trip = await this.tripsRepository.findTripWithUserId(id);
    if (!trip) {
      throw new NotFoundException('Trip not found');
    }
    if (trip.userId !== userId) {
      throw new ForbiddenException('You can only update your own trips');
    }

    // Handle cities update if provided
    let cities: City[] | undefined;
    if (updateTripDto.cities && updateTripDto.cities.length > 0) {
      const cityPromises = updateTripDto.cities.map((cityId) =>
        this.cityRepository.getCityById(cityId),
      );
      const citiesResults = await Promise.all(cityPromises);
      cities = citiesResults.filter((city): city is City => city !== null);
      
      if (cities.length === 0) {
        throw new BadRequestException('At least one valid city is required');
      }
    }

    return this.tripsRepository.updateTrip(id, updateTripDto, cities);
  }

  async remove(id: string, userId: string) {
    // Verify ownership
    const trip = await this.tripsRepository.findTripWithUserId(id);
    if (!trip) {
      throw new NotFoundException('Trip not found');
    }
    if (trip.userId !== userId) {
      throw new ForbiddenException('You can only delete your own trips');
    }

    return this.tripsRepository.removeTrip(id);
  }
}
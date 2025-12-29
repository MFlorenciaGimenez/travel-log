import { Repository } from 'typeorm';
import { Trip } from './entity/trip.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTripDto } from './dto/createTrip';
import { UpdateTripDto } from './dto/updateTrip';
import { City } from 'src/city/entity/city.entity';

@Injectable()
export class TripRepository {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepo: Repository<Trip>,
  ) {}

  async createTrip(createTripDto: CreateTripDto, userId: string, cities: City[]) {
    const { cities: _, ...data } = createTripDto;
    const trip = this.tripRepo.create({
      ...data,
      userId,
      cities,
    });
    return await this.tripRepo.save(trip);
  }

  async findAllByUserId(userId: string) {
    return this.tripRepo.find({
      where: { userId },
      relations: ['cities', 'user'],
      order: { startDate: 'DESC' },
    });
  }

  async findOneById(id: string) {
    return this.tripRepo.findOne({
      where: { id },
      relations: ['cities', 'user'],
    });
  }

  async findPublicTrips() {
    return this.tripRepo.find({
      where: { isPublic: true },
      relations: ['cities', 'user'],
      order: { startDate: 'DESC' },
    });
  }

  async updateTrip(id: string, updateTripDto: UpdateTripDto, cities?: City[]) {
    const updateData: Partial<Trip> = {};
    
    if (updateTripDto.title !== undefined) updateData.title = updateTripDto.title;
    if (updateTripDto.startDate !== undefined) updateData.startDate = new Date(updateTripDto.startDate);
    if (updateTripDto.endDate !== undefined) updateData.endDate = new Date(updateTripDto.endDate);
    if (updateTripDto.description !== undefined) updateData.description = updateTripDto.description;
    if (updateTripDto.isPublic !== undefined) updateData.isPublic = updateTripDto.isPublic;

    await this.tripRepo.update(id, updateData);

    if (cities) {
      const trip = await this.findOneById(id);
      if (!trip) {
        throw new NotFoundException('Trip not found');
      }
      trip.cities = cities;
      return this.tripRepo.save(trip);
    }

    return this.findOneById(id);
  }

  async removeTrip(id: string) {
    const result = await this.tripRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Trip not found');
    }
    return { message: 'Trip deleted successfully' };
  }

  async findTripWithUserId(id: string) {
    return this.tripRepo.findOne({
      where: { id },
      select: ['id', 'userId'],
    });
  }
}
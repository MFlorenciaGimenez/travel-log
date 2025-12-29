import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { Trip } from './entity/trip.entity';
import { City } from 'src/city/entity/city.entity';
import { TripRepository } from './trip.repository';
import { CityModule } from 'src/city/city.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trip, City]),
    CityModule,
  ],
  controllers: [TripsController],
  providers: [TripsService, TripRepository],
  exports: [TripsService],
})
export class TripsModule {}

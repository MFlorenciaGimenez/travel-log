import { Injectable } from '@nestjs/common';
import { CityRepository } from 'src/city/city.repository';
import { TripRepository } from './trip.repository';
import { CreateTripDto } from './dto/createTrip';
import { City } from 'src/city/entity/city.entity';

@Injectable()
export class TripsService {
    constructor(
        private readonly tripsRepository: TripRepository,
        private readonly cityRepository: CityRepository,
    ) {}

    async createTrip(createTripDto:CreateTripDto, userId:string) {
        const cityPromises = createTripDto.cities.map(id => this.cityRepository.getCityById(id));
        const citiesResults = await Promise.all(cityPromises);
        const cities = citiesResults.filter((city): city is City => city !== null);
    return this.tripsRepository.createTrip(createTripDto, userId, cities);
}
}
import { Repository } from "typeorm";
import { Trip } from "./entity/trip.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { CreateTripDto } from "./dto/createTrip";
import { City } from "src/city/entity/city.entity";




@Injectable()
export class TripRepository {
    constructor(
        @InjectRepository(Trip)
        private readonly tripRepo: Repository<Trip>,
    ){}
   async createTrip(createTripDto: CreateTripDto, userId: string, cities: City[]) {
        const { cities: _, ...data } = createTripDto;
        const trip = this.tripRepo.create({
            ...data,
            userId,
            cities,
        });
        return await this.tripRepo.save(trip);
    }
}
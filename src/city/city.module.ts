import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entity/city.entity';
import { CityRepository } from './city.repository';

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  controllers: [CityController],
  providers: [CityService, CityRepository],
  exports: [CityRepository, CityService],
})
export class CityModule {}

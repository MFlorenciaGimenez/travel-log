import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TripsService } from './trips.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateTripDto } from './dto/createTrip';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/common/utils/currentUser.decorator';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

@UseGuards(JwtAuthGuard)    
@Post('/create')
@ApiBearerAuth('JWT-auth')
@ApiOperation({ summary: 'Create a new trip' })
@ApiBody({ type: CreateTripDto })
@ApiResponse({ status: 201, description: 'Trip created successfully' })
@ApiResponse({ status: 400, description: 'Invalid request data' })
createTrip(
@Body() createTripDto: CreateTripDto,
@CurrentUser('id') userId:string) {
  return this.tripsService.createTrip(createTripDto, userId);
}
}
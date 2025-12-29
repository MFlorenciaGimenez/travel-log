import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/createTrip';
import { UpdateTripDto } from './dto/updateTrip';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/common/utils/currentUser.decorator';

@ApiTags('trips')
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create a new trip' })
  @ApiBody({ type: CreateTripDto })
  @ApiResponse({
    status: 201,
    description: 'Trip created successfully',
    schema: {
      example: {
        id: 'uuid',
        title: 'Summer in Paris',
        startDate: '2024-06-01',
        endDate: '2024-06-15',
        description: 'An amazing trip',
        isPublic: true,
        userId: 'uuid',
        cities: [],
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(
    @Body() createTripDto: CreateTripDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.tripsService.create(createTripDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all trips for the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'List of user trips',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll(@CurrentUser('id') userId: string) {
    return this.tripsService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get trip by ID' })
  @ApiParam({ name: 'id', description: 'Trip UUID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Trip details',
  })
  @ApiResponse({ status: 404, description: 'Trip not found' })
  findOne(@Param('id') id: string) {
    return this.tripsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update trip (only owner)' })
  @ApiParam({ name: 'id', description: 'Trip UUID', type: 'string' })
  @ApiBody({ type: UpdateTripDto })
  @ApiResponse({
    status: 200,
    description: 'Trip updated successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Not the owner' })
  @ApiResponse({ status: 404, description: 'Trip not found' })
  update(
    @Param('id') id: string,
    @Body() updateTripDto: UpdateTripDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.tripsService.update(id, updateTripDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete trip (only owner)' })
  @ApiParam({ name: 'id', description: 'Trip UUID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Trip deleted successfully',
    schema: {
      example: {
        message: 'Trip deleted successfully',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Not the owner' })
  @ApiResponse({ status: 404, description: 'Trip not found' })
  remove(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.tripsService.remove(id, userId);
  }
}
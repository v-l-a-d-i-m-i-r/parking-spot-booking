import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ParkingSpotEntity } from './parking-spot.entity';
import { ParkingSpotRepository } from './parking-spot.repository';
import { ParkingSpotService } from './parking-spot.service';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingSpotEntity])],
  providers: [ParkingSpotService, ParkingSpotRepository],
})
export class ParkingSpotModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ParkingSpotEntity } from './parking-spot.entity';

@Injectable()
export class ParkingSpotRepository {
  public constructor(
    @InjectRepository(ParkingSpotEntity)
    private readonly parkingSpotRepository: Repository<ParkingSpotEntity>,
  ) {}
}

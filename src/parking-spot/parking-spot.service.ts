import { Injectable } from '@nestjs/common';

import { ParkingSpotRepository } from './parking-spot.repository';

@Injectable()
export class ParkingSpotService {
  public constructor(private readonly parkingSpotRepository: ParkingSpotRepository) {}
}

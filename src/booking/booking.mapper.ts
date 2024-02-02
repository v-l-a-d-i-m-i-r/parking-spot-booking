import { Injectable } from '@nestjs/common';

import { BookingEntity } from './booking.entity';
import { BookingModel } from './booking.model';

@Injectable()
export class BookingMapper {
  public mapEtityToModel(entity: BookingEntity): BookingModel {
    return {
      id: entity.id,
      createdBy: entity.createdBy,
      startDatetime: entity.startDatetime.toISOString(),
      endDatetime: entity.endDatetime.toISOString(),
      parkingSpot: entity.parkingSpot,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  }

  public mapEntityToModelIfExists(entity: BookingEntity | null): BookingModel | null {
    if (!entity) {
      return null;
    }

    return this.mapEtityToModel(entity);
  }
}

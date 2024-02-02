import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookingController } from './booking.controller';
import { BookingEntity } from './booking.entity';
import { BookingMapper } from './booking.mapper';
import { BookingRepository } from './booking.repository';
import { BookingService } from './booking.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookingEntity])],
  controllers: [BookingController],
  providers: [BookingService, BookingRepository, BookingMapper],
})
export class BookingModule {}

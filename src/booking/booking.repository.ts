import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { BookingEntity } from './booking.entity';
import { BookingMapper } from './booking.mapper';
import { BookingModel } from './booking.model';

@Injectable()
export class BookingRepository {
  public constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
    private readonly bookingMapper: BookingMapper,
  ) {}

  public async createOne(input: CreateOneInput): Promise<BookingModel> {
    try {
      const insertResult = await this.bookingRepository.insert({
        createdBy: input.createdBy,
        parkingSpot: input.parkingSpot,
        startDatetime: new Date(input.startDatetime),
        endDatetime: new Date(input.endDatetime),
      });
      const booking = await this.bookingRepository.findOneByOrFail({ id: insertResult.identifiers[0].id });

      return this.bookingMapper.mapEtityToModel(booking);
    } catch (error) {
      this.handleError(error);
    }
  }

  public async updateOne(input: UpdateOneInput): Promise<BookingModel> {
    const { id } = input;
    const criteria = { id };
    const dataToUpdate: QueryDeepPartialEntity<BookingEntity> = {};

    if (input.startDatetime) {
      dataToUpdate.startDatetime = new Date(input.startDatetime);
    }

    if (input.endDatetime) {
      dataToUpdate.endDatetime = new Date(input.endDatetime);
    }

    if (input.parkingSpot) {
      dataToUpdate.parkingSpot = input.parkingSpot;
    }

    try {
      await this.bookingRepository.update(criteria, dataToUpdate);
      const booking = await this.bookingRepository.findOneByOrFail({ id });

      return this.bookingMapper.mapEtityToModel(booking);
    } catch (error) {
      this.handleError(error);
    }
  }

  public async deleteOne(input: DeleteOneInput): Promise<void> {
    await this.bookingRepository.delete({ id: input.id });
  }

  public async getOneById(input: GetOneByIdInput): Promise<BookingModel | null> {
    const booking = await this.bookingRepository.findOneBy({ id: input.id });

    return this.bookingMapper.mapEntityToModelIfExists(booking);
  }

  public async getMany(): Promise<BookingModel[]> {
    const bookings = await this.bookingRepository.find();

    return bookings.map((b) => this.bookingMapper.mapEtityToModel(b));
  }

  public async getManyByUserId(input: GetManyByUserIdInput): Promise<BookingModel[]> {
    const bookings = await this.bookingRepository.findBy({ createdBy: input.id });

    return bookings.map((b) => this.bookingMapper.mapEtityToModel(b));
  }

  private handleError(error: unknown): never {
    if (error instanceof QueryFailedError) {
      throw new BadRequestException(error.message);
    }

    throw error;
  }
}

type CreateOneInput = {
  createdBy: number;
  parkingSpot: number;
  startDatetime: string;
  endDatetime: string;
};

type UpdateOneInput = {
  id: number;
  createdBy?: number;
  parkingSpot?: number;
  startDatetime?: string;
  endDatetime?: string;
};

type DeleteOneInput = {
  id: number;
};

type GetOneByIdInput = {
  id: number;
};

type GetManyByUserIdInput = {
  id: number;
};

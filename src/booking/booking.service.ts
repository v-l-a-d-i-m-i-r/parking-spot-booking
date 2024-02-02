import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { BookingModel } from './booking.model';
import { BookingRepository } from './booking.repository';
import { Errors } from '../const/errors';
import { UserModel } from '../user/user.model';
import { isAdmin } from '../utils/is-admin';

@Injectable()
export class BookingService {
  public constructor(private readonly bookingRepository: BookingRepository) {}

  public async createOne(input: CreateOneInput): Promise<BookingModel> {
    const { user, booking } = input;

    return this.bookingRepository.createOne({
      ...booking,
      createdBy: user.id,
    });
  }

  public async updateOne(input: UpdateOneInput): Promise<BookingModel> {
    const { user, booking } = input;
    const { id, createdBy, ...dataToUpdate } = booking;

    const existingBooking = await this.bookingRepository.getOneById({ id });
    if (!existingBooking) {
      throw new NotFoundException('booking not found');
    }

    if (isAdmin(user)) {
      // only admin can reassign booking (change createdBy)
      return this.bookingRepository.updateOne({ id, createdBy, ...dataToUpdate });
    }

    this.throwIfNotOwnBooking({ user, booking: existingBooking });

    return this.bookingRepository.updateOne({ id, ...dataToUpdate });
  }

  public async deleteOne(input: DeleteOneInput): Promise<void> {
    const { user, booking } = input;
    const { id } = booking;

    const existingBooking = await this.bookingRepository.getOneById({ id });

    if (!existingBooking) {
      return;
    }

    if (isAdmin(user)) {
      await this.bookingRepository.deleteOne({ id });
    }

    const isOwner = this.checkIsOwner({ user, booking: existingBooking });
    if (!isOwner) {
      return;
    }

    await this.bookingRepository.deleteOne({ id });
  }

  public async getOne(input: GetOneInput): Promise<BookingModel> {
    const { user, booking } = input;
    const { id } = booking;

    const existingBooking = await this.bookingRepository.getOneById({ id });

    if (!existingBooking) {
      throw new NotFoundException('booking not found');
    }

    if (isAdmin(user)) {
      return this.getOneOrThrowError({ id });
    }

    this.throwIfNotOwnBooking({ user, booking: existingBooking });

    return this.getOneOrThrowError({ id });
  }

  public async getMany(input: GetManyInput): Promise<BookingModel[]> {
    const { user } = input;

    if (isAdmin(user)) {
      return this.bookingRepository.getMany();
    }

    return this.bookingRepository.getManyByUserId({ id: user.id });
  }

  private throwIfNotOwnBooking(input: ThrowIfNotOwnBookingInput) {
    const isOwner = this.checkIsOwner(input);

    if (!isOwner) {
      throw new UnauthorizedException(Errors.userIsNotOwnerOfBooking);
    }
  }

  private checkIsOwner(input: CheckIsOwnerInput): boolean {
    const { user, booking } = input;

    return user.id === booking.createdBy;
  }

  private async getOneOrThrowError(input: GetOneOrThrowErrorInput): Promise<BookingModel> {
    const booking = await this.bookingRepository.getOneById(input);

    if (!booking) {
      throw new NotFoundException(Errors.bookingNotFound);
    }

    return booking;
  }
}

type CreateOneInput = {
  user: UserModel;
  booking: {
    parkingSpot: number;
    startDatetime: string;
    endDatetime: string;
  };
};

type UpdateOneInput = {
  user: UserModel;
  booking: {
    id: number;
    createdBy?: number;
    parkingSpot?: number;
    startDatetime?: string;
    endDatetime?: string;
  };
};

type DeleteOneInput = {
  user: UserModel;
  booking: {
    id: number;
  };
};

type GetOneInput = {
  user: UserModel;
  booking: {
    id: number;
  };
};

type GetManyInput = {
  user: UserModel;
};

type ThrowIfNotOwnBookingInput = {
  user: Pick<UserModel, 'id'>;
  booking: Pick<BookingModel, 'createdBy'>;
};

type CheckIsOwnerInput = {
  user: Pick<UserModel, 'id'>;
  booking: Pick<BookingModel, 'createdBy'>;
};

type GetOneOrThrowErrorInput = {
  id: number;
};

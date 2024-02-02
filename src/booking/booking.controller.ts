import { Body, Controller, HttpCode, HttpStatus, Param, Patch, Post, Delete, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BookingService } from './booking.service';
import { CreateBookingBody, CreateBookingResponse } from './dto/create-booking.dto';
import { DeleteBookingParams } from './dto/delete-booking.dto';
import { GetBookingParams, GetBookingResponse } from './dto/get-booking.dto';
import { GetBookingsResponse } from './dto/get-bookings.dto';
import { UpdateBookingBody, UpdateBookingParams, UpdateBookingResponse } from './dto/update-booking.dto';
import { HTTPBearerAuth } from '../decorators/http-bearer-auth';
import { AuthUser } from '../decorators/token-user';
import { LoggerService } from '../logger/logger.service';
import { PrivateUserModel } from '../user/user.model';

@ApiTags('Bookings')
@HTTPBearerAuth()
@Controller('/api/v1/bookings')
export class BookingController {
  public constructor(
    private readonly logger: LoggerService,
    private readonly bookingService: BookingService,
  ) {}

  @ApiOperation({ description: 'Create Booking' })
  @ApiResponse({ type: CreateBookingResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  public async createOne(
    @AuthUser() user: PrivateUserModel,
    @Body() body: CreateBookingBody,
  ): Promise<CreateBookingResponse> {
    try {
      const booking = await this.bookingService.createOne({ user, booking: body });

      return new CreateBookingResponse(booking);
    } catch (error) {
      this.logger.error('BookingController.createOne', error);
      throw error;
    }
  }

  @ApiOperation({ description: 'Update Booking' })
  @ApiResponse({ type: UpdateBookingResponse })
  @HttpCode(HttpStatus.OK)
  @Patch('/:id')
  public async updateOne(
    @AuthUser() user: PrivateUserModel,
    @Param() params: UpdateBookingParams,
    @Body() body: UpdateBookingBody,
  ): Promise<UpdateBookingResponse> {
    try {
      const booking = await this.bookingService.updateOne({ user, booking: { id: params.id, ...body } });

      return new UpdateBookingResponse(booking);
    } catch (error) {
      this.logger.error('BookingController.updateOne', error);
      throw error;
    }
  }

  @ApiOperation({ description: 'Delete Booking' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  public async deleteOne(@AuthUser() user: PrivateUserModel, @Param() params: DeleteBookingParams): Promise<void> {
    try {
      await this.bookingService.deleteOne({ user, booking: { id: params.id } });
    } catch (error) {
      this.logger.error('BookingController.deleteOne', error);
      throw error;
    }
  }

  @ApiOperation({ description: 'Get Booking' })
  @ApiResponse({ type: GetBookingResponse })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  public async getOne(
    @AuthUser() user: PrivateUserModel,
    @Param() params: GetBookingParams,
  ): Promise<GetBookingResponse> {
    try {
      const booking = await this.bookingService.getOne({ user, booking: { id: params.id } });

      return new GetBookingResponse(booking);
    } catch (error) {
      this.logger.error('BookingController.getOne', error);
      throw error;
    }
  }

  @ApiOperation({ description: 'Get Bookings' })
  @ApiResponse({ type: GetBookingsResponse })
  @HttpCode(HttpStatus.OK)
  @Get('/')
  public async getUsers(@AuthUser() user: PrivateUserModel): Promise<GetBookingsResponse> {
    try {
      const bookings = await this.bookingService.getMany({ user });

      return new GetBookingsResponse(bookings);
    } catch (error) {
      this.logger.error('BookingController.getMany', error);
      throw error;
    }
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsPositive } from 'class-validator';

import { BaseBookingResponse } from './base-booking.dto';
import { BaseResponse } from '../../utils/base-response';

export class CreateBookingBody {
  @IsInt()
  @IsPositive()
  @ApiProperty({ description: 'Parking Spot ID', type: Number })
  public parkingSpot: number;

  @IsDateString()
  @ApiProperty({ description: 'Start Datetime', type: String })
  public startDatetime: string;

  @IsDateString()
  @ApiProperty({ description: 'End Datetime', type: String })
  public endDatetime: string;
}

export class CreateBookingResponse extends BaseResponse<BaseBookingResponse> {
  @ApiProperty({ type: BaseBookingResponse })
  public data: BaseBookingResponse;
}

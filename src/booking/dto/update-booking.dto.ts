import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, IsPositive } from 'class-validator';

import { BaseBookingResponse } from './base-booking.dto';
import { BaseResponse } from '../../utils/base-response';

export class UpdateBookingBody {
  @IsInt()
  @IsPositive()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Parking Spot ID', type: Number })
  public parkingSpot?: number;

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Start Datetime', type: String })
  public startDatetime?: string;

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'End Datetime', type: String })
  public endDatetime?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Parking Spot ID', type: Number })
  public createdBy?: number;
}

export class UpdateBookingParams {
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  public id: number;
}

export class UpdateBookingResponse extends BaseResponse<BaseBookingResponse> {
  @ApiProperty({ type: BaseBookingResponse })
  public data: BaseBookingResponse;
}

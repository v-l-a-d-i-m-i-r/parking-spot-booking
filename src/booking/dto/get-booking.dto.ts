import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

import { BaseBookingResponse } from './base-booking.dto';
import { BaseResponse } from '../../utils/base-response';

export class GetBookingParams {
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  public id: number;
}

export class GetBookingResponse extends BaseResponse<BaseBookingResponse> {
  @ApiProperty({ type: BaseBookingResponse })
  public data: BaseBookingResponse;
}

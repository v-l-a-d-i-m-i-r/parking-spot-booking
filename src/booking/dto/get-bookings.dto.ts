import { ApiProperty } from '@nestjs/swagger';

import { BaseBookingResponse } from './base-booking.dto';
import { BaseResponse } from '../../utils/base-response';

export class GetBookingsResponse extends BaseResponse<BaseBookingResponse[]> {
  @ApiProperty({ type: BaseBookingResponse, isArray: true })
  public data: BaseBookingResponse[];
}

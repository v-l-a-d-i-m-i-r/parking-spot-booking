import { ApiProperty } from '@nestjs/swagger';

export class BaseBookingResponse {
  @ApiProperty({ description: 'Booking ID', type: Number })
  public id: number;

  @ApiProperty({ description: 'Creator ID', type: Number })
  public createdBy: number;

  @ApiProperty({ description: 'Booking Start Date', type: String })
  public startDatetime: string;

  @ApiProperty({ description: 'Booking End Date', type: String })
  public endDatetime: string;

  @ApiProperty({ description: 'Parking Spot ID', type: Number })
  public parkingSpot: number;

  @ApiProperty({ description: 'Booking Created At', type: String })
  public createdAt: string;

  @ApiProperty({ description: 'Booking Updated At', type: String })
  public updatedAt: string;
}

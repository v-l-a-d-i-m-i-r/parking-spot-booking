import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

export class DeleteBookingParams {
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  public id: number;
}

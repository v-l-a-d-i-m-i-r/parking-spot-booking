import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('parking_spots')
export class ParkingSpotEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public name: string;
}

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('bookings')
export class BookingEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public createdBy: number;

  @Column()
  public startDatetime: Date;

  @Column()
  public endDatetime: Date;

  @Column()
  public parkingSpot: number;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { UserRole } from './user.model';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column({ unique: true })
  public email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  public role: UserRole;

  @Column()
  public token: string;
}

import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

const configService = new ConfigService();

import { Initial1706716844652 } from '../../migrations/1706716844652-initial';
import { UserEntity } from '../user/user.entity';

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [UserEntity],
  migrations: [Initial1706716844652],
  migrationsTableName: 'parking_spot_booking_migrations',
});

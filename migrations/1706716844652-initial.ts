import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1706716844652 implements MigrationInterface {
  public name = 'Initial1706716844652';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS btree_gist;

      CREATE TABLE IF NOT EXISTS users (
        "id"        SERIAL      PRIMARY KEY,
        "firstName" varchar(50) NOT NULL,
        "lastName"  varchar(50) NOT NULL,
        "email"     varchar(50) NOT NULL UNIQUE,
        "role"      varchar(8)  NOT NULL,
        "token"     varchar(24) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS parking_spots (
        "id"   SERIAL       PRIMARY KEY,
        "name" varchar(100) NOT NULL UNIQUE
      );

      CREATE TABLE IF NOT EXISTS bookings (
        "id"            SERIAL      PRIMARY KEY,
        "createdBy"     INT         NOT NULL REFERENCES users,
        "startDatetime" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        "endDatetime"   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        "parkingSpot"   INT         NOT NULL REFERENCES parking_spots,
        "createdAt"     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        "updatedAt"     TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      ALTER TABLE bookings DROP CONSTRAINT IF EXISTS prevent_double_spots_bookings;
      ALTER TABLE bookings
      ADD CONSTRAINT prevent_double_spots_bookings EXCLUDE USING gist (
        "parkingSpot" WITH =,
        tstzrange("startDatetime", "endDatetime", '[)') WITH &&
      );

      ALTER TABLE bookings DROP CONSTRAINT IF EXISTS prevent_double_users_bookings;
      ALTER TABLE bookings
      ADD CONSTRAINT prevent_double_users_bookings EXCLUDE USING gist (
        "createdBy" WITH =,
        tstzrange("startDatetime", "endDatetime", '[)') WITH &&
      );

      ALTER TABLE bookings DROP CONSTRAINT IF EXISTS prevent_start_date_greater_than_end_date;
      ALTER TABLE bookings
      ADD CONSTRAINT prevent_start_date_greater_than_end_date EXCLUDE USING gist (
        "createdBy" WITH =,
        tstzrange("startDatetime", "endDatetime", '[)') WITH &&
      );

      ALTER TABLE bookings DROP CONSTRAINT IF EXISTS check_time;
      ALTER TABLE bookings 
      ADD CONSTRAINT check_time CHECK ("startDatetime" < "endDatetime");
    `);

    // seed data
    await queryRunner.query(`
      INSERT INTO
        users("firstName", "lastName", email, role, token)
        values('AdminName', 'AdminSurname', 'admin@gmail.com', 'admin', '65ba75343bfb862f515a0cc2');

      INSERT INTO
        users("firstName", "lastName", email, role, token)
        values('RegularName', 'RegularSurname', 'regular@gmail.com', 'regular', '65ba7fabe3aedeb0ac4f53c3');

      INSERT INTO
        parking_spots("name")
        values('Parking Spot 1');

      INSERT INTO
        parking_spots("name")
        values('Parking Spot 2');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS bookings;
      DROP TABLE IF EXISTS parking_spots;
      DROP TABLE IF EXISTS users;
      DROP EXTENSION IF EXISTS btree_gist;
    `);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePasswordResetTable1719410203527
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.password_reset(
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        reset_code VARCHAR(10) NOT NULL,
        expires_at TIMESTAMP NOT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE public.password_reset;
    `);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1719406021015 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.users (
          id character varying(255) NOT NULL,
          name character varying(255) NOT NULL,
          email character varying(255) NOT NULL,
          password character varying NOT NULL,
          PRIMARY KEY (id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
          DROP TABLE public.users
      `);
  }
}

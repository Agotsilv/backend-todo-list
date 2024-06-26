import { MigrationInterface, QueryRunner } from 'typeorm';

export class Task1719418967726 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE public.tasks (
          id character varying(255) NOT NULL,
          title character varying(255) NOT NULL,
          description character varying(255),
          user_id character varying(255) NOT NULL,
          created_at character varying(255) NOT NULL,
          PRIMARY KEY (id),
          FOREIGN KEY (user_id) REFERENCES public.users (id) ON DELETE CASCADE
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
          DROP TABLE public.tasks
      `);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsers1683279035563 implements MigrationInterface {
  name = 'createUsers1683279035563';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "users"
                                 (
                                     "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                                     "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                                     "id"        uuid                     NOT NULL DEFAULT uuid_generate_v4(),
                                     "username"  character varying        NOT NULL,
                                     "age"       integer                  NOT NULL,
                                     "email"     character varying        NOT NULL,
                                     CONSTRAINT "PK_user_id" PRIMARY KEY ("id")
                                 )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}

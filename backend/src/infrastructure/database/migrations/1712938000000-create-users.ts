import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateUsers1712938000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "firstName" VARCHAR NOT NULL,
        "lastName" VARCHAR NOT NULL,
        "description" TEXT NOT NULL
      );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users";`)
  }
}

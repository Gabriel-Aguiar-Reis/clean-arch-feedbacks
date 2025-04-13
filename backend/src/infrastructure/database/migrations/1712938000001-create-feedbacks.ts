import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFeedbacks1712938000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "feedbacks" (
        "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "comment" TEXT NOT NULL,
        "rating" INTEGER NOT NULL,
        "userId" INTEGER NOT NULL,
        CONSTRAINT "FK_user_feedback" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "feedbacks";`);
  }
}

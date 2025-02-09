import { MigrationInterface, QueryRunner } from 'typeorm';

export class Schema1739138455452 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" RENAME COLUMN "boardIdId" TO "boardId"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" RENAME COLUMN "boardId" TO "boardIdId"`,
    );
  }
}

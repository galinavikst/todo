import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class Schema1739213166852 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('board', 'createdAt');
    await queryRunner.dropColumn('board', 'updatedAt');
    await queryRunner.dropColumn('board', 'description');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'board',
      new TableColumn({
        name: 'createdAt',
        type: 'timestamp', // Adjust the type to the original type of the column
      }),
    );
    await queryRunner.addColumn(
      'board',
      new TableColumn({
        name: 'updatedAt',
        type: 'timestamp', // Adjust the type to the original type of the column
      }),
    );
    await queryRunner.addColumn(
      'board',
      new TableColumn({
        name: 'description',
        type: 'varchar', // Adjust the type to the original type of the column
      }),
    );
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterIncomesAddMonth1666462750438 implements MigrationInterface {
  name = 'AlterIncomesAddMonth1666462750438';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "incomes" ADD "month" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "incomes" DROP COLUMN "month"`);
  }
}

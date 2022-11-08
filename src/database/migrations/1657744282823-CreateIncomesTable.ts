import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateIncomesTable1657744282823 implements MigrationInterface {
  name = 'CreateIncomesTable1657744282823';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "incomes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "account_name" character varying NOT NULL, "total_value" numeric(11,2) NOT NULL DEFAULT '0', "day_of_receipt" integer, "fixed" boolean NOT NULL DEFAULT false, "control_record_id" uuid NOT NULL, CONSTRAINT "PK_d737b3d0314c1f0da5461a55e5e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "incomes" ADD CONSTRAINT "FK_3cf97889bdcd4a24707c8ab4431" FOREIGN KEY ("control_record_id") REFERENCES "control_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "incomes" DROP CONSTRAINT "FK_3cf97889bdcd4a24707c8ab4431"`);
    await queryRunner.query(`DROP TABLE "incomes"`);
  }
}

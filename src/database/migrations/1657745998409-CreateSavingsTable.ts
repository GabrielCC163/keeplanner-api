import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSavingsTable1657745998409 implements MigrationInterface {
  name = 'CreateSavingsTable1657745998409';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "savings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "account_name" character varying NOT NULL, "total_value" numeric(11,2) NOT NULL DEFAULT '0', "control_record_id" uuid NOT NULL, CONSTRAINT "PK_12862ba6871fc7be04cbd26230c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "savings" ADD CONSTRAINT "FK_8f2e27de2f1082c52d2f99f9572" FOREIGN KEY ("control_record_id") REFERENCES "control_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "savings" DROP CONSTRAINT "FK_8f2e27de2f1082c52d2f99f9572"`);
    await queryRunner.query(`DROP TABLE "savings"`);
  }
}

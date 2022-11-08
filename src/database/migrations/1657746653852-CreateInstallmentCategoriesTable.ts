import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInstallmentCategoriesTable1657746653852 implements MigrationInterface {
  name = 'CreateInstallmentCategoriesTable1657746653852';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "installment_categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "description" character varying NOT NULL, "due_day" integer, "due_month" integer NOT NULL, "control_record_id" uuid NOT NULL, CONSTRAINT "PK_4c4dd3de259405c3f2745df6b5e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "installment_categories" ADD CONSTRAINT "FK_c4aefc32187256a98da73f0a245" FOREIGN KEY ("control_record_id") REFERENCES "control_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "installment_categories" DROP CONSTRAINT "FK_c4aefc32187256a98da73f0a245"`);
    await queryRunner.query(`DROP TABLE "installment_categories"`);
  }
}

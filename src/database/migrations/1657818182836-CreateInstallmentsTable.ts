import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInstallmentsTable1657818182836 implements MigrationInterface {
  name = 'CreateInstallmentsTable1657818182836';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "installments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "description" character varying NOT NULL, "value" numeric(11,2) NOT NULL DEFAULT '0', "installment" integer NOT NULL, "totalInstallments" integer NOT NULL, "installment_category_id" uuid NOT NULL, CONSTRAINT "PK_c74e44aa06bdebef2af0a93da1b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "installments" ADD CONSTRAINT "FK_6088bb8439094de26771e522a2e" FOREIGN KEY ("installment_category_id") REFERENCES "installment_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "installments" DROP CONSTRAINT "FK_6088bb8439094de26771e522a2e"`);
    await queryRunner.query(`DROP TABLE "installments"`);
  }
}

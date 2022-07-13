import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateExpensesTable1657745509936 implements MigrationInterface {
  name = 'CreateExpensesTable1657745509936';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."expenses_status_enum" AS ENUM('AP', 'PA')`);
    await queryRunner.query(
      `CREATE TABLE "expenses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "description" character varying NOT NULL, "total_value" numeric(11,2) NOT NULL DEFAULT '0', "due_day" integer, "due_month" integer NOT NULL, "status" "public"."expenses_status_enum" NOT NULL DEFAULT 'AP', "control_record_id" uuid NOT NULL, CONSTRAINT "PK_94c3ceb17e3140abc9282c20610" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "expenses" ADD CONSTRAINT "FK_12e1cbd8c6a78c57abb6beee7d1" FOREIGN KEY ("control_record_id") REFERENCES "control_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "expenses" DROP CONSTRAINT "FK_12e1cbd8c6a78c57abb6beee7d1"`);
    await queryRunner.query(`DROP TABLE "expenses"`);
    await queryRunner.query(`DROP TYPE "public"."expenses_status_enum"`);
  }
}

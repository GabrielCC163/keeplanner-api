import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateControlRecordsTable1657482506978 implements MigrationInterface {
  name = 'CreateControlRecordsTable1657482506978';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "control_records" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "month" integer NOT NULL, "year" integer NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_b522c917f917ca1275f55d61254" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_9a553f81bfa99664c94c1f5251" ON "control_records" ("month", "year", "user_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "control_records" ADD CONSTRAINT "FK_216431411656b3d1f531f6342b8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "control_records" DROP CONSTRAINT "FK_216431411656b3d1f531f6342b8"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_9a553f81bfa99664c94c1f5251"`);
    await queryRunner.query(`DROP TABLE "control_records"`);
  }
}

import { BaseEntity } from '@database/base.entity';
import { ControlRecordEntity } from '@modules/control-records/entities/control-record.entity';
import { AfterLoad, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('incomes')
export class IncomeEntity extends BaseEntity {
  @Column({ name: 'account_name' })
  accountName: string;

  @AfterLoad() _convertToFloat() {
    if (this.totalValue) this.totalValue = parseFloat(this.totalValue as any);
  }
  @Column({ type: 'numeric', name: 'total_value', precision: 11, scale: 2, default: 0 })
  totalValue: number;

  @Column({ type: 'integer', name: 'day_of_receipt', nullable: true })
  dayOfReceipt: number;

  @Column({ type: 'integer', name: 'month', nullable: true })
  month: number;

  @Column({ default: false })
  fixed: boolean;

  @ManyToOne(() => ControlRecordEntity, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'control_record_id' })
  controlRecord: ControlRecordEntity;

  @Column({ type: 'uuid', name: 'control_record_id' })
  controlRecordId: string;
}

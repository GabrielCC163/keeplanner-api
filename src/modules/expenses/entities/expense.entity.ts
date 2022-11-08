import { BaseEntity } from '@database/base.entity';
import { ControlRecordEntity } from '@modules/control-records/entities/control-record.entity';
import { AfterLoad, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ExpenseStatus } from '../enums/expense-status.enum';

@Entity('expenses')
export class ExpenseEntity extends BaseEntity {
  @Column()
  description: string;

  @AfterLoad() _convertToFloat() {
    if (this.totalValue) this.totalValue = parseFloat(this.totalValue as any);
  }
  @Column({ type: 'numeric', name: 'total_value', precision: 11, scale: 2, default: 0 })
  totalValue: number;

  @Column({ type: 'integer', name: 'due_day', nullable: true })
  dueDay?: number;

  @Column({ type: 'integer', name: 'due_month' })
  dueMonth: number;

  @Column({ type: 'enum', enum: ExpenseStatus, default: ExpenseStatus.AP })
  status: ExpenseStatus;

  @ManyToOne(() => ControlRecordEntity, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'control_record_id' })
  controlRecord: ControlRecordEntity;

  @Column({ type: 'uuid', name: 'control_record_id' })
  controlRecordId: string;
}

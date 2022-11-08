import { BaseEntity } from '@database/base.entity';
import { ControlRecordEntity } from '@modules/control-records/entities/control-record.entity';
import { InstallmentEntity } from '@modules/installments/entities/installment.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('installment_categories')
export class InstallmentCategoryEntity extends BaseEntity {
  @Column()
  description: string;

  @Column({ type: 'integer', name: 'due_day', nullable: true })
  dueDay?: number;

  @Column({ type: 'integer', name: 'due_month' })
  dueMonth: number;

  @OneToMany(() => InstallmentEntity, (installment) => installment.installmentCategory)
  installments?: InstallmentEntity[];

  @ManyToOne(() => ControlRecordEntity, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'control_record_id' })
  controlRecord: ControlRecordEntity;

  @Column({ type: 'uuid', name: 'control_record_id' })
  controlRecordId: string;
}

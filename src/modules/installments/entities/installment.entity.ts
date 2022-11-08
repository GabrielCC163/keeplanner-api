import { BaseEntity } from '@database/base.entity';
import { InstallmentCategoryEntity } from '@modules/installment-categories/entities/installment-category.entity';
import { AfterLoad, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('installments')
export class InstallmentEntity extends BaseEntity {
  @Column()
  description: string;

  @AfterLoad() _convertToFloat() {
    if (this.value) this.value = parseFloat(this.value as any);
  }
  @Column({ type: 'numeric', precision: 11, scale: 2, default: 0 })
  value: number;

  @Column({ type: 'integer' })
  installment: number;

  @Column({ type: 'integer' })
  totalInstallments: number;

  @ManyToOne(() => InstallmentCategoryEntity, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'installment_category_id' })
  installmentCategory: InstallmentCategoryEntity;

  @Column({ type: 'uuid', name: 'installment_category_id' })
  installmentCategoryId: string;
}

import { BaseEntity } from '@database/base.entity';
import { ExpenseEntity } from '@modules/expenses/entities/expense.entity';
import { IncomeEntity } from '@modules/incomes/entities/income.entity';
import { InstallmentCategoryEntity } from '@modules/installment-categories/entities/installment-category.entity';
import { SavingEntity } from '@modules/savings/entities/saving.entity';
import { UserEntity } from '@modules/users/entities/user.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('control_records')
@Index(['month', 'year', 'userId'], { unique: true })
export class ControlRecordEntity extends BaseEntity {
  @Column({ type: 'integer' })
  month: number;

  @Column({ type: 'integer' })
  year: number;

  @ManyToOne(() => UserEntity, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @OneToMany(() => SavingEntity, (saving) => saving.controlRecord)
  savings?: SavingEntity[];

  @OneToMany(() => ExpenseEntity, (expense) => expense.controlRecord)
  expenses?: ExpenseEntity[];

  @OneToMany(() => IncomeEntity, (income) => income.controlRecord)
  incomes?: IncomeEntity[];

  @OneToMany(() => InstallmentCategoryEntity, (installmentCategory) => installmentCategory.controlRecord)
  installmentCategories?: InstallmentCategoryEntity[];
}

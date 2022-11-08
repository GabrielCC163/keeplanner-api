import { Module } from '@nestjs/common';
import { ControlRecordsService } from './control-records.service';
import { ControlRecordsController } from './control-records.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControlRecordEntity } from './entities/control-record.entity';
import { SavingEntity } from '@modules/savings/entities/saving.entity';
import { ExpenseEntity } from '@modules/expenses/entities/expense.entity';
import { IncomeEntity } from '@modules/incomes/entities/income.entity';
import { InstallmentCategoryEntity } from '@modules/installment-categories/entities/installment-category.entity';
import { InstallmentEntity } from '@modules/installments/entities/installment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ControlRecordEntity,
      SavingEntity,
      IncomeEntity,
      ExpenseEntity,
      InstallmentCategoryEntity,
      InstallmentEntity,
    ]),
  ],
  controllers: [ControlRecordsController],
  providers: [ControlRecordsService],
})
export class ControlRecordsModule {}

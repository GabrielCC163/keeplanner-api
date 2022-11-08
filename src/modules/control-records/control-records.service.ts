import { ExpenseEntity } from '@modules/expenses/entities/expense.entity';
import { IncomeEntity } from '@modules/incomes/entities/income.entity';
import { InstallmentCategoryEntity } from '@modules/installment-categories/entities/installment-category.entity';
import { InstallmentEntity } from '@modules/installments/entities/installment.entity';
import { SavingEntity } from '@modules/savings/entities/saving.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateControlRecordDto } from './dto/create-control-record.dto';
import { FindControlRecordDto } from './dto/find-control-record.dto';
import { ControlRecordEntity } from './entities/control-record.entity';

@Injectable()
export class ControlRecordsService {
  constructor(
    @InjectRepository(ControlRecordEntity)
    private controlRecordRepository: Repository<ControlRecordEntity>,
    @InjectRepository(SavingEntity)
    private savingRepository: Repository<SavingEntity>,
    @InjectRepository(IncomeEntity)
    private incomeRepository: Repository<IncomeEntity>,
    @InjectRepository(ExpenseEntity)
    private expenseRepository: Repository<ExpenseEntity>,
    @InjectRepository(InstallmentCategoryEntity)
    private installmentCategoryRepository: Repository<InstallmentCategoryEntity>,
    @InjectRepository(InstallmentEntity)
    private installmentRepository: Repository<InstallmentEntity>,
  ) {}

  async create(userId: string, createControlRecord: CreateControlRecordDto) {
    return await this.controlRecordRepository.save({ ...createControlRecord, userId });
  }

  async findOne(userId: string, findControlRecord: FindControlRecordDto) {
    const { month, year } = findControlRecord;
    const controlRecord = await this.controlRecordRepository.findOne({
      where: {
        month,
        year,
        userId,
      },
      relations: ['savings', 'incomes', 'expenses', 'installmentCategories', 'installmentCategories.installments'],
    });

    if (!controlRecord) throw new NotFoundException('Not found');
    return controlRecord;
  }

  async remove(id: string) {
    await this.savingRepository.delete({ controlRecordId: id });
    await this.incomeRepository.delete({ controlRecordId: id });
    await this.expenseRepository.delete({ controlRecordId: id });
    const instCategories = await this.installmentCategoryRepository.find({
      where: { controlRecordId: id },
      select: ['id'],
    });
    if (instCategories) {
      for await (const cat of instCategories) {
        await this.installmentRepository.delete({ installmentCategoryId: cat.id });
      }
      await this.installmentCategoryRepository.delete({ controlRecordId: id });
    }
    await this.controlRecordRepository.delete(id);
  }
}

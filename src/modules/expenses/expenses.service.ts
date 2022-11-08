import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpenseEntity } from './entities/expense.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(ExpenseEntity)
    private expenseRepository: Repository<ExpenseEntity>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto) {
    return await this.expenseRepository.save(createExpenseDto);
  }

  async findOne(id: string) {
    return await this.expenseRepository.findOne(id);
  }

  async findAll(controlRecordId: string): Promise<ExpenseEntity[]> {
    return await this.expenseRepository.find({
      where: {
        controlRecordId,
      },
      order: { createdAt: 'ASC' },
    });
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto) {
    await this.expenseRepository.update({ id }, updateExpenseDto);
    return await this.expenseRepository.findOne(id);
  }

  async remove(id: string) {
    await this.expenseRepository.delete(id);
  }
}

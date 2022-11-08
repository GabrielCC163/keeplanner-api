import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { IncomeEntity } from './entities/income.entity';

@Injectable()
export class IncomesService {
  constructor(
    @InjectRepository(IncomeEntity)
    private incomeRepository: Repository<IncomeEntity>,
  ) {}

  async create(createIncomeDto: CreateIncomeDto) {
    return await this.incomeRepository.save(createIncomeDto);
  }

  async findOne(id: string) {
    return await this.incomeRepository.findOne(id);
  }

  async findAll(controlRecordId: string): Promise<IncomeEntity[]> {
    return await this.incomeRepository.find({
      where: {
        controlRecordId,
      },
      order: { createdAt: 'ASC' },
    });
  }

  async update(id: string, updateIncomeDto: UpdateIncomeDto) {
    await this.incomeRepository.update({ id }, updateIncomeDto);
    return await this.incomeRepository.findOne(id);
  }

  async remove(id: string) {
    await this.incomeRepository.delete(id);
  }
}

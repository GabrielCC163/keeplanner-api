import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInstallmentDto } from './dto/create-installment.dto';
import { UpdateInstallmentDto } from './dto/update-installment.dto';
import { InstallmentEntity } from './entities/installment.entity';

@Injectable()
export class InstallmentsService {
  constructor(
    @InjectRepository(InstallmentEntity)
    private installmentRepository: Repository<InstallmentEntity>,
  ) {}

  async create(createInstallmentDto: CreateInstallmentDto) {
    return await this.installmentRepository.save(createInstallmentDto);
  }

  async findOne(id: string) {
    return await this.installmentRepository.findOne(id);
  }

  async findAll(controlRecordId: string): Promise<InstallmentEntity[]> {
    return await this.installmentRepository
      .createQueryBuilder('installment')
      .innerJoin('installment.installmentCategory', 'category')
      .where('category.controlRecordId = :controlRecordId', { controlRecordId })
      .orderBy({ 'installment.createdAt': 'ASC' })
      .getMany();
  }

  async update(id: string, updateInstallmentDto: UpdateInstallmentDto) {
    await this.installmentRepository.update({ id }, updateInstallmentDto);
  }

  async remove(id: string) {
    await this.installmentRepository.delete(id);
  }
}

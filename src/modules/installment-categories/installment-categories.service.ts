import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInstallmentCategoryDto } from './dto/create-installment-category.dto';
import { UpdateInstallmentCategoryDto } from './dto/update-installment-category.dto';
import { InstallmentCategoryEntity } from './entities/installment-category.entity';

@Injectable()
export class InstallmentCategoriesService {
  constructor(
    @InjectRepository(InstallmentCategoryEntity)
    private installmentCategoryRepository: Repository<InstallmentCategoryEntity>,
  ) {}

  async create(createInstallmentCategoryDto: CreateInstallmentCategoryDto) {
    return await this.installmentCategoryRepository.save(createInstallmentCategoryDto);
  }

  async findOne(id: string) {
    return await this.installmentCategoryRepository.findOne(id);
  }

  async update(id: string, updateInstallmentCategoryDto: UpdateInstallmentCategoryDto) {
    await this.installmentCategoryRepository.update({ id }, updateInstallmentCategoryDto);
    return await this.installmentCategoryRepository.findOne(id);
  }

  async remove(id: string) {
    await this.installmentCategoryRepository.delete(id);
  }
}

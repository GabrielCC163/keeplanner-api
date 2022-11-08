import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSavingDto } from './dto/create-saving.dto';
import { UpdateSavingDto } from './dto/update-saving.dto';
import { SavingEntity } from './entities/saving.entity';

@Injectable()
export class SavingsService {
  constructor(
    @InjectRepository(SavingEntity)
    private savingRepository: Repository<SavingEntity>,
  ) {}

  async create(createSavingDto: CreateSavingDto) {
    return await this.savingRepository.save(createSavingDto);
  }

  async findOne(id: string) {
    return await this.savingRepository.findOne(id);
  }

  async findAll(controlRecordId: string): Promise<SavingEntity[]> {
    return await this.savingRepository.find({
      where: {
        controlRecordId,
      },
      order: { createdAt: 'ASC' },
    });
  }

  async update(id: string, updateSavingDto: UpdateSavingDto) {
    await this.savingRepository.update({ id }, updateSavingDto);
    return await this.savingRepository.findOne(id);
  }

  async remove(id: string) {
    await this.savingRepository.delete(id);
  }
}

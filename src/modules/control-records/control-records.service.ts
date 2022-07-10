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
  ) {}

  async create(createControlRecord: CreateControlRecordDto) {
    return await this.controlRecordRepository.save(createControlRecord);
  }

  async findOne(userId: string, findControlRecord: FindControlRecordDto) {
    const { month, year } = findControlRecord;
    const controlRecord = await this.controlRecordRepository.findOne({
      where: {
        month,
        year,
        userId,
      },
    });

    if (!controlRecord) throw new NotFoundException('Not found');
    return controlRecord;
  }

  async remove(id: string) {
    await this.controlRecordRepository.delete(id);
  }
}

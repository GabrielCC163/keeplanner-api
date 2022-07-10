import { Module } from '@nestjs/common';
import { ControlRecordsService } from './control-records.service';
import { ControlRecordsController } from './control-records.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControlRecordEntity } from './entities/control-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ControlRecordEntity])],
  controllers: [ControlRecordsController],
  providers: [ControlRecordsService],
})
export class ControlRecordsModule {}

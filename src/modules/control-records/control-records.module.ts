import { Module } from '@nestjs/common';
import { ControlRecordsService } from './control-records.service';
import { ControlRecordsController } from './control-records.controller';

@Module({
  controllers: [ControlRecordsController],
  providers: [ControlRecordsService]
})
export class ControlRecordsModule {}

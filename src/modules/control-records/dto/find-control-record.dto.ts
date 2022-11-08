import { PickType } from '@nestjs/swagger';
import { CreateControlRecordDto } from './create-control-record.dto';

export class FindControlRecordDto extends PickType(CreateControlRecordDto, ['month', 'year'] as const) {}

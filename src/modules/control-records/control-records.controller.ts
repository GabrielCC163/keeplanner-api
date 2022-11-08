import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Request,
  Query,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ControlRecordsService } from './control-records.service';
import { CreateControlRecordDto } from './dto/create-control-record.dto';
import { FindControlRecordDto } from './dto/find-control-record.dto';

@ApiTags('Control Records')
@ApiBearerAuth()
@Controller('control-records')
export class ControlRecordsController {
  constructor(private readonly controlRecordsService: ControlRecordsService) {}

  @Post()
  async create(@Request() req, @Body() createControlRecord: CreateControlRecordDto) {
    return await this.controlRecordsService.create(req.user.userId, createControlRecord);
  }

  @Get()
  async findOne(@Request() req, @Query() findControlRecord: FindControlRecordDto) {
    const { month, year } = findControlRecord;
    if (!month || !year) throw new BadRequestException('month and year are required');
    return await this.controlRecordsService.findOne(req.user.userId, findControlRecord);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.controlRecordsService.remove(id);
  }
}

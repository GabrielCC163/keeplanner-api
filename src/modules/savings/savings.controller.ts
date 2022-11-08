import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SavingsService } from './savings.service';
import { CreateSavingDto } from './dto/create-saving.dto';
import { UpdateSavingDto } from './dto/update-saving.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Savings')
@Controller('savings')
export class SavingsController {
  constructor(private readonly savingsService: SavingsService) {}

  @Post()
  async create(@Body() createSavingDto: CreateSavingDto) {
    return await this.savingsService.create(createSavingDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.savingsService.findOne(id);
  }

  @Get()
  async findAll(@Query('controlRecordId') controlRecorId) {
    return await this.savingsService.findAll(controlRecorId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSavingDto: UpdateSavingDto) {
    return await this.savingsService.update(id, updateSavingDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.savingsService.remove(id);
  }
}

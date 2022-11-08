import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query } from '@nestjs/common';
import { IncomesService } from './incomes.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Incomes')
@Controller('incomes')
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {}

  @Post()
  async create(@Body() createIncomeDto: CreateIncomeDto) {
    return await this.incomesService.create(createIncomeDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.incomesService.findOne(id);
  }

  @Get()
  async findAll(@Query('controlRecordId') controlRecorId) {
    return await this.incomesService.findAll(controlRecorId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateIncomeDto: UpdateIncomeDto) {
    return await this.incomesService.update(id, updateIncomeDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.incomesService.remove(id);
  }
}

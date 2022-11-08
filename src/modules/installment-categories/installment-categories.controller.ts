import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query } from '@nestjs/common';
import { InstallmentCategoriesService } from './installment-categories.service';
import { CreateInstallmentCategoryDto } from './dto/create-installment-category.dto';
import { UpdateInstallmentCategoryDto } from './dto/update-installment-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Installment Categories')
@Controller('installment-categories')
export class InstallmentCategoriesController {
  constructor(private readonly installmentCategoriesService: InstallmentCategoriesService) {}

  @Post()
  async create(@Body() createInstallmentCategoryDto: CreateInstallmentCategoryDto) {
    return await this.installmentCategoriesService.create(createInstallmentCategoryDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.installmentCategoriesService.findOne(id);
  }

  @Get()
  async findAll(@Query('controlRecordId') controlRecorId) {
    return await this.installmentCategoriesService.findAll(controlRecorId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateInstallmentCategoryDto: UpdateInstallmentCategoryDto) {
    return await this.installmentCategoriesService.update(id, updateInstallmentCategoryDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.installmentCategoriesService.remove(id);
  }
}

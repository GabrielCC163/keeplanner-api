import { Controller, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { InstallmentsService } from './installments.service';
import { CreateInstallmentDto } from './dto/create-installment.dto';
import { UpdateInstallmentDto } from './dto/update-installment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Installments')
@Controller('installments')
export class InstallmentsController {
  constructor(private readonly installmentsService: InstallmentsService) {}

  @Post()
  async create(@Body() createInstallmentDto: CreateInstallmentDto) {
    return await this.installmentsService.create(createInstallmentDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateInstallmentDto: UpdateInstallmentDto) {
    return await this.installmentsService.update(id, updateInstallmentDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.installmentsService.remove(id);
  }
}

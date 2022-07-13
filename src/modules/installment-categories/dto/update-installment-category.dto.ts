import { PartialType } from '@nestjs/swagger';
import { CreateInstallmentCategoryDto } from './create-installment-category.dto';

export class UpdateInstallmentCategoryDto extends PartialType(CreateInstallmentCategoryDto) {}

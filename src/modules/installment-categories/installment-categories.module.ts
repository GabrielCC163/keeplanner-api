import { Module } from '@nestjs/common';
import { InstallmentCategoriesService } from './installment-categories.service';
import { InstallmentCategoriesController } from './installment-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstallmentCategoryEntity } from './entities/installment-category.entity';
import { InstallmentEntity } from '@modules/installments/entities/installment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InstallmentCategoryEntity, InstallmentEntity])],
  controllers: [InstallmentCategoriesController],
  providers: [InstallmentCategoriesService],
})
export class InstallmentCategoriesModule {}

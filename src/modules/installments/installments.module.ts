import { Module } from '@nestjs/common';
import { InstallmentsService } from './installments.service';
import { InstallmentsController } from './installments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstallmentEntity } from './entities/installment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InstallmentEntity])],
  controllers: [InstallmentsController],
  providers: [InstallmentsService],
})
export class InstallmentsModule {}

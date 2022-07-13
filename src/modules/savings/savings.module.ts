import { Module } from '@nestjs/common';
import { SavingsService } from './savings.service';
import { SavingsController } from './savings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavingEntity } from './entities/saving.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SavingEntity])],
  controllers: [SavingsController],
  providers: [SavingsService],
})
export class SavingsModule {}

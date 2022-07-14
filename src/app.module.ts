import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from '@config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';

import AppDataSource from './ormconfig';
import { UsersModule } from '@modules/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@modules/auth/guard/jwt-auth.guard';
import { ControlRecordsModule } from './modules/control-records/control-records.module';
import { AuthModule } from '@modules/auth/auth.modules';
import { IncomesModule } from './modules/incomes/incomes.module';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { SavingsModule } from './modules/savings/savings.module';
import { InstallmentCategoriesModule } from './modules/installment-categories/installment-categories.module';
import { InstallmentsModule } from './modules/installments/installments.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      load: [getConfig],
      cache: false,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(AppDataSource),
    UsersModule,
    ControlRecordsModule,
    IncomesModule,
    ExpensesModule,
    SavingsModule,
    InstallmentCategoriesModule,
    InstallmentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

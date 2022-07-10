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

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [getConfig],
      cache: false,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(AppDataSource),
    UsersModule,
    ControlRecordsModule,
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

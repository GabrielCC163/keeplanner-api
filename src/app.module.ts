import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from '@config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';

import AppDataSource from './ormconfig';
import { UsersModule } from '@modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [getConfig],
      cache: false,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(AppDataSource),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

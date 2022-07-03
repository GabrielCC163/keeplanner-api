import { getConfig } from '@config/app.config';
import 'dotenv/config';
import { ConnectionOptions } from 'typeorm';

const apiConfig = getConfig();

const AppDataSource: ConnectionOptions = {
  type: 'postgres',
  host: apiConfig.database.host,
  port: apiConfig.database.port,
  username: apiConfig.database.user,
  password: apiConfig.database.password,
  database: apiConfig.database.name,
  entities: [__dirname + '/**/*.entity.ts'],
  synchronize: false,

  migrationsRun: false,
  logging: true,
  logger: 'file',
  connectTimeoutMS: 10000,
  maxQueryExecutionTime: 100,

  migrations: [__dirname + '/database/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

export default AppDataSource;

import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ConfigService } from '@nestjs/config';

export function ormConfig(
  configService: ConfigService,
): PostgresConnectionOptions {
  return {
    type: 'postgres',
    host: configService.get<string>('database.typeorm.host'),
    port: configService.get<number>('database.typeorm.port'),
    username: configService.get<string>('database.typeorm.username'),
    password: configService.get<string>('database.typeorm.password'),
    database: configService.get<string>('database.typeorm.database'),
    migrations: [join(__dirname, 'migrations/*.js')],
    synchronize: configService.get<boolean>('database.typeorm.synchronize'),
    migrationsRun: configService.get<boolean>('database.typeorm.migrationsRun'),
  };
}

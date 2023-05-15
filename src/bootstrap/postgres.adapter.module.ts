import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import UserEntity from '../infrastructure/postgres-adapter/entity/user.entity';
import { Repository } from 'typeorm';
import { PostgresUserAdapter } from '../infrastructure/postgres-adapter/adapter/postgres.user.adapter';
import { ormConfig } from '../infrastructure/postgres-adapter/ormconfig';
import { ConfigModule, ConfigService } from '@nestjs/config';

const PostgresUserAdapterProvider = {
  provide: 'PostgresUserAdapter',
  useFactory: (userRepository: Repository<UserEntity>) =>
    new PostgresUserAdapter(userRepository),
  inject: [getRepositoryToken(UserEntity)],
};

const entities = [UserEntity];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...ormConfig(configService),
        entities: entities,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature(entities),
  ],
  providers: [PostgresUserAdapterProvider],
  exports: [PostgresUserAdapterProvider, TypeOrmModule.forFeature(entities)],
})
export class PostgresAdapterModule {}

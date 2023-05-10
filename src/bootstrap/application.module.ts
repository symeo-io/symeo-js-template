import { Module } from '@nestjs/common';
import { DomainModule } from './domain.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { UserController } from '../application/controller/user.controller';
import * as process from 'process';
import { HelloWorldController } from '../application/controller/hello-world.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
      load: [configuration],
    }),
    DomainModule,
  ],
  controllers: [UserController, HelloWorldController],
})
export class ApplicationModule {}

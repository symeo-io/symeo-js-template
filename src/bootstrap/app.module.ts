import { Module } from '@nestjs/common';
import { RestApiAdapterModule } from './rest-api-adapter.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
      load: [configuration],
    }),
    RestApiAdapterModule,
  ],
})
export class AppModule {}

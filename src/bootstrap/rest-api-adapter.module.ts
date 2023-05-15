import { Module } from '@nestjs/common';
import { DomainModule } from './domain.module';
import { UserController } from '../application/rest-api-adapter/controller/user.controller';

@Module({
  imports: [DomainModule],
  controllers: [UserController],
})
export class RestApiAdapterModule {}

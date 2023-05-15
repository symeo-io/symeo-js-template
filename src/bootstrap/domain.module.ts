import { Module } from '@nestjs/common';
import { PostgresAdapterModule } from './postgres.adapter.module';
import UserStoragePort from '../domain/port/out/user.storage.port';
import { UserService } from '../domain/service/user.service';

const UserFacadeProvider = {
  provide: 'UserFacade',
  useFactory: (userStoragePort: UserStoragePort) =>
    new UserService(userStoragePort),
  inject: ['PostgresUserAdapter'],
};
@Module({
  imports: [PostgresAdapterModule],
  providers: [UserFacadeProvider],
  exports: [UserFacadeProvider],
})
export class DomainModule {}

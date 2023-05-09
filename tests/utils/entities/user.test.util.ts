import { Repository } from 'typeorm';
import UserEntity from '../../../src/infrastructure/postgres-adapter/entity/user.entity';
import { AppClient } from '../app.client';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

export class UserTestUtil {
  public repository: Repository<UserEntity>;
  constructor(appClient: AppClient) {
    this.repository = appClient.module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  }

  public async createUser(userId: string): Promise<UserEntity> {
    const user = new UserEntity();
    user.id = userId;
    user.username = faker.name.firstName();
    user.age = faker.datatype.number();
    user.email = faker.internet.email();

    await this.repository.save(user);

    return user;
  }

  public empty() {
    return this.repository.delete({});
  }
}

import UserStoragePort from '../../../../src/domain/port/out/user.storage.port';
import { instance, mock } from 'ts-mockito';
import { UserService } from '../../../../src/domain/service/user.service';
import { v4 as uuid } from 'uuid';
import { HttpException } from '@nestjs/common';
import { User } from '../../../../src/domain/model/user.model';
import { faker } from '@faker-js/faker';

describe('UserService', () => {
  let mockedUserStoragePort: UserStoragePort;
  let userStoragePort: UserStoragePort;
  let userService: UserService;

  beforeEach(() => {
    mockedUserStoragePort = mock<UserStoragePort>();
    userStoragePort = instance(mockedUserStoragePort);
    userService = new UserService(userStoragePort);
  });

  describe('findById', () => {
    it('should throw a new 404 HttpException', async () => {
      // Given
      const userId = uuid();

      // When
      jest
        .spyOn(userStoragePort, 'findById')
        .mockImplementation(() => Promise.resolve(undefined));

      let exception: HttpException | null = null;
      try {
        await userService.findById(userId);
      } catch (error: any) {
        exception = error;
      }

      // Then
      expect(exception).not.toBeNull();
      expect(exception?.getStatus()).toEqual(404);
    });

    it('should get a user', async () => {
      // Given
      const userId = uuid();

      // When
      jest
        .spyOn(userStoragePort, 'findById')
        .mockImplementation(() =>
          Promise.resolve(
            new User(
              userId,
              faker.name.firstName(),
              faker.datatype.number(),
              faker.internet.email(),
            ),
          ),
        );

      let exception: HttpException | null = null;
      let user: User | null = null;
      try {
        user = await userService.findById(userId);
      } catch (error: any) {
        exception = error;
      }

      // Then
      expect(exception).toBeNull();
      expect(user).not.toBeNull();
      expect(user?.id).toEqual(userId);
      expect(user?.username).toBeDefined();
      expect(user?.age).toBeDefined();
      expect(user?.email).toBeDefined();
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      // Given
      const userId = uuid();
      const username = faker.name.firstName();
      const age = faker.datatype.number();
      const email = faker.internet.email();

      const user: User = new User(userId, username, age, email);

      // When
      const spy = jest.spyOn(userStoragePort, 'create');

      await userService.create(userId, username, age, email);

      // Then
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(user);
    });
  });
});

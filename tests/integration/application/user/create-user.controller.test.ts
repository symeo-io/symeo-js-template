import { AppClient } from '../../app.client';
import { v4 as uuid } from 'uuid';
import { UserTestUtil } from '../../../utils/entities/user.test.util';
import { faker } from '@faker-js/faker';

describe('UserController', () => {
  let appClient: AppClient;

  let userTestUtil: UserTestUtil;

  beforeAll(async () => {
    appClient = new AppClient();
    await appClient.init();
    userTestUtil = new UserTestUtil(appClient);
  }, 30000);

  afterAll(async () => {
    await appClient.close();
  });

  beforeEach(async () => {
    await userTestUtil.empty();
  });

  describe('(POST) /users', () => {
    it('should respond 200 and create user', async () => {
      const userId = uuid();
      const username = faker.name.firstName();
      const age = faker.datatype.number();
      const email = faker.internet.email();

      const response = await appClient.request().post(`/users`).send({
        id: userId,
        username: username,
        age: age,
        email: email,
      });
      expect(response.status).toEqual(201);
      expect(response.body.user).toBeDefined();
      expect(response.body.user.id).toEqual(userId);
      expect(response.body.user.username).toEqual(username);
      expect(response.body.user.age).toEqual(age);
      expect(response.body.user.email).toEqual(email);
    });
  });
});

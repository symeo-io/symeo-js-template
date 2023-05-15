import { AppClient } from '../../app.client';
import { v4 as uuid } from 'uuid';
import { UserTestUtil } from '../../../utils/entities/user.test.util';

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

  describe('(GET) /users', () => {
    it('should respond 200 and get user', async () => {
      const userId = uuid();
      await userTestUtil.createUser(userId);
      const response = await appClient.request().get(`/users/${userId}`);
      expect(response.status).toEqual(200);
      expect(response.body.user).toBeDefined();
      expect(response.body.user.id).toEqual(userId);
      expect(response.body.user.username).toBeDefined();
      expect(response.body.user.age).toBeDefined();
      expect(response.body.user.email).toBeDefined();
    });

    it('should respond 404 and throw error', async () => {
      const userId = uuid();
      const response = await appClient.request().get(`/users/${userId}`);
      expect(response.status).toEqual(404);
    });
  });
});

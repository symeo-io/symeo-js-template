import UserFacade from '../port/in/user.facade';
import { User } from '../model/user.model';
import UserStoragePort from '../port/out/user.storage.port';
import { SymeoException } from '../exception/symeo.exception';
import { SymeoExceptionCode } from '../exception/symeo.exception.code.enum';

export class UserService implements UserFacade {
  constructor(private readonly userStoragePort: UserStoragePort) {}
  async findById(userId: string): Promise<User> {
    const user = await this.userStoragePort.findById(userId);
    if (!user) {
      throw new SymeoException(
        `User with id ${userId} not found`,
        SymeoExceptionCode.USER_NOT_FOUND,
      );
    }
    return user;
  }

  async create(
    userId: string,
    username: string,
    age: number,
    email: string,
  ): Promise<User> {
    const user = new User(userId, username, age, email);
    await this.userStoragePort.create(user);
    return user;
  }
}

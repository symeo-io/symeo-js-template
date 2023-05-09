import { User } from '../../model/user.model';

export default interface UserStoragePort {
  findById(userId: string): Promise<User | undefined>;

  create(user: User): Promise<void>;
}

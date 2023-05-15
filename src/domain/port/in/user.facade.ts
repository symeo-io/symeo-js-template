import { User } from '../../model/user.model';

export default interface UserFacade {
  findById(userId: string): Promise<User>;

  create(
    id: string,
    username: string,
    age: number,
    email: string,
  ): Promise<User>;
}

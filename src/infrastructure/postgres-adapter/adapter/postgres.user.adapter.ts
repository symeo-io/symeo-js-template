import UserStoragePort from '../../../domain/port/out/user.storage.port';
import { User } from '../../../domain/model/user.model';
import { Repository } from 'typeorm';
import UserEntity from '../entity/user.entity';

export class PostgresUserAdapter implements UserStoragePort {
  constructor(private userRepository: Repository<UserEntity>) {}
  async findById(userId: string): Promise<User | undefined> {
    const entity = await this.userRepository.findOneBy({ id: userId });
    if (!entity) return undefined;
    return entity.toDomain();
  }
  async create(user: User): Promise<void> {
    await this.userRepository.save(UserEntity.fromDomain(user));
  }
}

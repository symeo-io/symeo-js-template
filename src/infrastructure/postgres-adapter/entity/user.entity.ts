import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import AbstractEntity from './abstract.entity';
import { User } from '../../../domain/model/user.model';

@Entity('users')
export default class UserEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  username: string;
  @Column()
  age: number;
  @Column()
  email: string;

  public toDomain(): User {
    return new User(this.id, this.username, this.age, this.email);
  }

  static fromDomain(user: User): UserEntity {
    const entity = new UserEntity();
    entity.id = user.id;
    entity.username = user.username;
    entity.age = user.age;
    entity.email = user.email;
    return entity;
  }
}

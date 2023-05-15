import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../../domain/model/user.model';

export class UserDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  age: number;
  @ApiProperty()
  email: string;

  constructor(id: string, username: string, age: number, email: string) {
    this.id = id;
    this.username = username;
    this.age = age;
    this.email = email;
  }

  static fromDomain(user: User) {
    return new UserDTO(user.id, user.username, user.age, user.email);
  }
}

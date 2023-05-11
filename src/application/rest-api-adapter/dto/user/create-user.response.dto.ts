import { UserDTO } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../../domain/model/user.model';

export class CreateUserResponseDTO {
  @ApiProperty({ type: UserDTO })
  user: UserDTO;

  static fromDomain(user: User) {
    const dto = new CreateUserResponseDTO();
    dto.user = UserDTO.fromDomain(user);
    return dto;
  }
}

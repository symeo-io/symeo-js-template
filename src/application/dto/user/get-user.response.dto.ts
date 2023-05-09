import { ApiProperty } from '@nestjs/swagger';
import { UserDTO } from './user.dto';
import { User } from '../../../domain/model/user.model';

export class GetUserResponseDTO {
  @ApiProperty({ type: UserDTO })
  user: UserDTO;

  static fromDomain(user: User) {
    const dto = new GetUserResponseDTO();
    dto.user = UserDTO.fromDomain(user);
    return dto;
  }
}

import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import UserFacade from '../../../domain/port/in/user.facade';
import { GetUserResponseDTO } from '../dto/user/get-user.response.dto';
import { CreateUserDTO } from '../dto/user/create-user.dto';
import { CreateUserResponseDTO } from '../dto/user/create-user.response.dto';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    @Inject('UserFacade')
    private readonly userFacade: UserFacade,
  ) {}

  @ApiOkResponse({
    description: 'User successfully retrieved',
    type: GetUserResponseDTO,
  })
  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<GetUserResponseDTO> {
    const user = await this.userFacade.findById(userId);
    return GetUserResponseDTO.fromDomain(user);
  }

  @ApiOkResponse({
    description: 'User successfully created',
    type: CreateUserResponseDTO,
  })
  @Post()
  async createUser(
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<CreateUserResponseDTO> {
    const user = await this.userFacade.create(
      createUserDTO.id,
      createUserDTO.username,
      createUserDTO.age,
      createUserDTO.email,
    );

    return CreateUserResponseDTO.fromDomain(user);
  }
}

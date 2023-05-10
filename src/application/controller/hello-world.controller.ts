import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('hello-world')
@ApiTags('hello-world')
export class HelloWorldController {
  @ApiOkResponse({ description: 'Simple Hello World route' })
  @Get()
  async getHelloWorld() {
    return 'Hello World';
  }
}

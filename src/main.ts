import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ApplicationModule } from 'src/bootstrap/application.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { SymeoExceptionHttpFilter } from './application/rest-api-adapter/common/symeo.exception.http.filter';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    credentials: true,
    origin: configService.get<string>('cors.origin'),
  });
  app.useGlobalFilters(new SymeoExceptionHttpFilter(new Logger()));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Symeo JS Template')
    .setVersion('1.0')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('openapi', app, swaggerDocument);
  await app.listen(9999);
}

bootstrap();

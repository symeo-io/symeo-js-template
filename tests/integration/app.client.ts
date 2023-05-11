import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from 'testcontainers';
import * as request from 'supertest';
import supertest from 'supertest';
import * as process from 'process';
import { SymeoExceptionHttpFilter } from '../../src/application/rest-api-adapter/common/symeo.exception.http.filter';

export class AppClient {
  public app: INestApplication;
  public module: TestingModule;
  public container: StartedPostgreSqlContainer;

  public async init() {
    this.container = await new PostgreSqlContainer()
      .withExposedPorts(5432)
      .withDatabase('symeo-js-template-test')
      .withUsername('postgres-test')
      .withPassword('P@ssw0rd-test')
      .withReuse()
      .start();

    process.env.DATABASE_TYPEORM_HOST = this.container.getHost();
    process.env.DATABASE_TYPEORM_PORT = this.container.getPort().toString();

    const { ApplicationModule } = await import(
      'src/bootstrap/application.module'
    );

    this.module = await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile();

    this.app = this.module.createNestApplication();
    this.app.useGlobalFilters(new SymeoExceptionHttpFilter(new Logger()));
    this.app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await this.app.init();
  }

  public async close() {
    await this.app.close();
  }

  public request(): supertest.SuperTest<supertest.Test> {
    return request(this.app.getHttpServer());
  }
}

import * as process from 'process';

export default () => {
  return {
    cors: {
      origin: process.env.CORS_ORIGIN,
    },
    database: {
      typeorm: {
        host: process.env.DATABASE_TYPEORM_HOST,
        port: parseInt(process.env.DATABASE_TYPEORM_PORT as string, 10) || 5432,
        username: process.env.DATABASE_TYPEORM_USERNAME,
        password: process.env.DATABASE_TYPEORM_PASSWORD,
        database: process.env.DATABASE_TYPEORM_DATABASE,
        synchronize: process.env.DATABASE_TYPEORM_SYNCHRONIZE,
        migrationsRun: process.env.DATABASE_TYPEORM_MIGRATIONS_RUN,
      },
    },
  };
};

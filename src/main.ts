import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { readFileSync } from 'node:fs';
import * as yaml from 'js-yaml';
import * as swaggerUi from 'swagger-ui-express';
import { join } from 'node:path';
import 'dotenv/config';
import { LoggingService } from './logging/logs.service';
import {
  HttpExceptionFilter,
  UnexpectedErrorFilter,
} from './errors/exceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const logger = app.get(LoggingService);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  app.useLogger(logger);
  app.useGlobalFilters(
    new UnexpectedErrorFilter(logger),
    new HttpExceptionFilter(logger),
  );

  process.on('uncaughtException', (err: Error) => {
    logger.error(`Uncaught Exception: ${err.message}`, err.stack);
  });
  process.on('unhandledRejection', (reason: any) => {
    logger.error(`Unhandled Rejection: ${reason}`);
  });

  BigInt.prototype['toJSON'] = function () {
    return this.toString();
  };

  const projectFolder = process.cwd();
  const yamlPath = join(projectFolder, 'doc', 'api.yaml');
  const fileContents = readFileSync(yamlPath, 'utf8');
  const swaggerDocument = yaml.load(fileContents);

  app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();

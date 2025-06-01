import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { readFileSync } from 'node:fs';
import * as yaml from 'js-yaml';
import * as swaggerUi from 'swagger-ui-express';
import { join } from 'node:path';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const projectFolder = process.cwd();
  const yamlPath = join(projectFolder, 'doc', 'api.yaml');
  const fileContents = readFileSync(yamlPath, 'utf8');
  const swaggerDocument = yaml.load(fileContents);

  app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();

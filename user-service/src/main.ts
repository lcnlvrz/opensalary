import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as compression from 'compression';
import * as cors from 'cors';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { APP_BASE_URL } from './config/constants';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.use(morgan('combined'));
  app.use(
    cors({
      origin: config.get<string>(APP_BASE_URL),
    }),
  );
  app.use(compression());
  await app.listen(process.env.PORT || 3001);
}
bootstrap();

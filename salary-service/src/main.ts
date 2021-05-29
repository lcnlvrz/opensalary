import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as compression from 'compression';
import * as cors from 'cors';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_BASE_URL } from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = app.get(ConfigService);

  app.use(helmet());
  app.use(morgan('combined'));
  app.use(
    cors({
      origin: config.get<string>(APP_BASE_URL),
    }),
  );
  app.use(compression());
  await app.listen(process.env.PORT || 3002);
}
bootstrap();

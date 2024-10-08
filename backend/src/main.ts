import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  WINSTON_MODULE_NEST_PROVIDER,
  WINSTON_MODULE_PROVIDER,
} from 'nest-winston';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { User } from '@prisma/client';
import fs from 'node:fs';
import path from 'node:path';

// Extend the Express Request interface to include a user object
declare global {
  namespace Express {
    interface Request {
      userId?: number;
      user?: User;
    }
  }
}

async function bootstrap() {
  const httpsOptions = process.env.USE_HTTPS === 'true' && {
    key: fs.readFileSync(path.join(process.cwd(), './server.key')),
    cert: fs.readFileSync(path.join(process.cwd(), './server.crt')),
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix('v1'); // API versioning

  const configService = app.get(ConfigService);
  const loggerService = app.get(WINSTON_MODULE_PROVIDER);

  const port = configService.get<number>('PORT');
  const nodeEnvironment = configService.get<string>('NODE_ENV');
  const cookieSecret = configService.get<string>('COOKIE_SECRET');

  if (nodeEnvironment !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('ESN Student Market API')
      .setDescription('ESN VUT Brno Student Marketplace')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          in: 'header',
          name: 'Authorization',
          description: 'Auth user token',
        },
        'logged-in',
      )
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    loggerService.info('Swagger is running on /api');
  }

  app.use(cookieParser(cookieSecret));

  loggerService.info(`Server is running on port ${port}`);

  if (process.env.USE_HTTPS === 'true') {
    loggerService.info('Using HTTPS');
  }

  await app.listen(port);
}
bootstrap();

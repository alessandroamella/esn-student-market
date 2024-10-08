import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { UserModule } from './user/user.module';
import winston from 'winston';
import Joi from 'joi';
import { TelegramBotModule } from 'telegram-bot/telegram-bot.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: 'debug',
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('Backend', {
              colors: true,
              prettyPrint: true,
              processId: true,
            }),
          ),
        }),
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().port().default(3000),
        JWT_SECRET: Joi.string().required(),
        COOKIE_SECRET: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        AWS_S3_BUCKET_NAME: Joi.string().required(),
        TELEGRAM_BOT_TOKEN: Joi.string().required(),
        ENABLE_TELEGRAM_LOGIN: Joi.boolean().required(),
      }),
    }),
    PrismaModule,
    AuthModule,
    FileModule,
    UserModule,
    TelegramBotModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

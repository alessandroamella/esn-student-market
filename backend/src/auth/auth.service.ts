import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import crypto from 'node:crypto';
import { TelegramDataDto } from './dto/telegram-data.dto';
import { AuthTokenSignedDto } from './dto/auth-token-signed.dto';
import { UserService } from 'user/user.service';
import { AuthPayloadDto } from './dto/auth-payload.dto';
import { Role, User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  private botToken: string;

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private config: ConfigService,
    private prisma: PrismaService,
  ) {
    this.botToken = this.config.get<string>('TELEGRAM_BOT_TOKEN');
  }

  /**
   * Validate Telegram data based on the hash
   * @param data - Telegram data
   * @returns True if the data is valid
   */
  private validateTelegramData(data: TelegramDataDto): boolean {
    const { hash, ...dataCheck } = data;
    const dataCheckString = Object.keys(dataCheck)
      .sort()
      .map((key) => `${key}=${dataCheck[key]}`)
      .join('\n');

    const secret = crypto.createHash('sha256').update(this.botToken).digest();
    const hmac = crypto
      .createHmac('sha256', secret)
      .update(dataCheckString)
      .digest('hex');

    return hmac === hash;
  }

  /**
   * Validate Telegram login data and return a JWT token
   * @param data - Telegram login data
   * @returns JWT token
   */
  async validateTelegramLogin(
    data: TelegramDataDto,
  ): Promise<AuthTokenSignedDto> {
    if (!this.validateTelegramData(data)) {
      throw new UnauthorizedException('Invalid Telegram data');
    }

    const tgAuth = await this.prisma.telegramAuth.findUnique({
      where: {
        telegramId: data.id,
      },
      select: {
        user: {
          select: this.userService.publicUserSelect,
        },
      },
    });

    let user: User;
    if (tgAuth) {
      user = tgAuth.user;
    } else {
      user = await this.userService.create({
        picture: data.photo_url,
        username: data.username,
        isActive: true,
        role: Role.USER,
        telegramAuth: {
          create: {
            telegramId: data.id,
          },
        },
      });
    }

    const payload = {
      id: user.id,
    } as AuthPayloadDto;

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

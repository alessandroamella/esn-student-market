import {
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import crypto from 'node:crypto';
import { TelegramDataDto } from './telegram/telegram.dto';
import { UserService } from 'user/user.service';
import { Role, User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { AuthTokenSignedDto, AuthPayloadDto } from './auth.dto';
import { LoginUserDto, SignUpUserDto } from './local/local.dto';
import bcrypt from 'bcrypt';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class AuthService {
  private botToken: string | null;

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private config: ConfigService,
    private prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  private handleTelegram() {
    const shouldEnable = this.config.get<boolean>('ENABLE_TELEGRAM_LOGIN');
    if (!shouldEnable) {
      this.logger.info('Telegram login is not enabled');
      this.botToken = null;
      return;
    }

    this.botToken = this.config.get<string>('TELEGRAM_BOT_TOKEN');
    if (!this.botToken) {
      this.logger.error(
        'ENABLE_TELEGRAM_LOGIN is true but Telegram bot token is not set',
      );
      process.exit(1);
    }

    this.logger.info('Telegram login is enabled');
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

  private async returnToken(user: { id: number }): Promise<AuthTokenSignedDto> {
    const payload = {
      id: user.id,
    } as AuthPayloadDto;

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
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
        role: Role.USER,
        telegramAuth: {
          create: {
            telegramId: data.id,
          },
        },
      });
    }

    return this.returnToken(user);
  }

  private async validatePassword(
    localAuth: { hashedPwd: string },
    password: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, localAuth.hashedPwd);
  }

  /**
   * Validate local login data and return a JWT token
   * @param data - Local login data
   * @returns JWT token
   */
  async validateLocalLogin(data: LoginUserDto): Promise<AuthTokenSignedDto> {
    const localAuth = await this.prisma.localAuth.findUnique({
      where: {
        email: data.email,
      },
      select: {
        hashedPwd: true,
        user: {
          select: {
            id: true,
          },
        },
      },
    });

    if (
      !localAuth ||
      !(await this.validatePassword(localAuth, data.password))
    ) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.returnToken(localAuth.user);
  }

  /**
   * Create a new user with local login
   * @param data - User data
   * @returns JWT token
   */
  async signUp(data: SignUpUserDto): Promise<AuthTokenSignedDto> {
    const hashedPwd = await bcrypt.hash(data.password, 10);

    this.logger.warn('SEND EMAIL NOT IMPLEMENTED');

    // sign the email and make token valid for 1 hour
    const verifyToken = this.jwtService.sign(
      { email: data.email },
      { expiresIn: '1h' },
    );

    const user = await this.userService.create({
      username: data.username,
      role: Role.USER,
      picture: data.picture,
      localAuth: {
        create: {
          email: data.email,
          verifyToken,
          hashedPwd,
        },
      },
    });

    return this.returnToken(user);
  }

  async verifyEmail(token: string): Promise<HttpStatus> {
    let email: string;

    try {
      const { email: _email } = this.jwtService.verify<{ email: string }>(
        token,
      );
      if (!_email) {
        throw new Error();
      }

      email = _email;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    const localAuth = await this.prisma.localAuth.findUnique({
      where: { email, verified: false },
    });

    if (!localAuth) {
      throw new UnauthorizedException('Invalid email or already verified');
    }

    await this.prisma.localAuth.update({
      where: {
        email,
      },
      data: {
        verified: true,
        verifyToken: null,
        resetToken: null,
      },
    });

    return HttpStatus.OK;
  }
}

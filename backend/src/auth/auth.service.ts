import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  private botToken: string;

  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {
    this.botToken = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
  }

  validateTelegramData(data: Record<string, string>): boolean {
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

  async validateTelegramLogin(data: Record<string, string>): Promise<string> {
    if (!this.validateTelegramData(data)) {
      throw new UnauthorizedException('Invalid Telegram data');
    }

    const payload = {
      id: data.id,
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
      photo_url: data.photo_url,
      auth_date: data.auth_date,
    };

    return this.jwtService.signAsync(payload);
  }
}

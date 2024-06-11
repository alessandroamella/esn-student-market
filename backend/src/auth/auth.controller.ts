import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('telegram')
  async telegramLogin(@Body() data: Record<string, string>) {
    return { token: await this.authService.validateTelegramLogin(data) };
  }
}

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiOkResponse, ApiBody, ApiTags } from '@nestjs/swagger';
import { TelegramDataDto } from './dto/telegram-data.dto';
import { AuthTokenSignedDto } from './dto/auth-token-signed.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('telegram')
  @ApiOperation({ summary: 'Login with Telegram' })
  @ApiOkResponse({
    description: 'Returns a JWT token',
    type: AuthTokenSignedDto,
  })
  @ApiBody({ type: TelegramDataDto })
  @ApiTags('auth')
  async telegramLogin(
    @Body() data: TelegramDataDto,
  ): Promise<AuthTokenSignedDto> {
    return this.authService.validateTelegramLogin(data);
  }
}

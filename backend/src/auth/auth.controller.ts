import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiOperation,
  ApiOkResponse,
  ApiBody,
  ApiTags,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { TelegramDataDto } from './telegram/telegram.dto';
import { AuthTokenSignedDto } from './auth.dto';
import { LoginUserDto, SignUpUserDto } from './local/local.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('telegram')
  @ApiOperation({ summary: 'Login with Telegram' })
  @ApiOkResponse({
    description: 'Returns a JWT token',
    type: AuthTokenSignedDto,
  })
  @ApiBody({ type: TelegramDataDto })
  async telegramLogin(
    @Body() data: TelegramDataDto,
  ): Promise<AuthTokenSignedDto> {
    return this.authService.validateTelegramLogin(data);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiOkResponse({
    description: 'Returns a JWT token',
    type: AuthTokenSignedDto,
  })
  @ApiBody({ type: LoginUserDto })
  async login(@Body() data: LoginUserDto): Promise<AuthTokenSignedDto> {
    return this.authService.validateLocalLogin(data);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiOkResponse({
    description: 'Returns a JWT token',
    type: AuthTokenSignedDto,
  })
  @ApiBody({ type: SignUpUserDto })
  async signUp(@Body() data: SignUpUserDto): Promise<AuthTokenSignedDto> {
    return this.authService.signUp(data);
  }

  @Post('verify')
  @ApiOperation({ summary: 'Verify email' })
  @ApiOkResponse({
    description: 'Email successfully verified',
  })
  @ApiBadRequestResponse({
    description: 'Invalid token or email already verified',
  })
  @ApiBody({ type: String })
  async verify(@Body() token: string): Promise<HttpStatus> {
    return this.authService.verifyEmail(token);
  }
}

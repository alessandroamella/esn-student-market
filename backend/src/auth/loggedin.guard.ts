import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthPayloadDto } from './dto/auth-payload.dto';
import { UserService } from 'user/user.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private config: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = (await this.jwtService.verifyAsync(token, {
        secret: this.config.get<string>('JWT_SECRET'),
      })) as AuthPayloadDto;
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      const user = await this.userService.findOne({ id: payload.id });
      if (!user) {
        throw new UnauthorizedException();
      }
      request.userId = user.id;
      request.user = user;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

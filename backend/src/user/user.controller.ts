import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { User } from './user.decorator';
import { ReturnedUserDto } from './user.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('user')
@UseGuards(AuthGuard)
@ApiTags('user')
@ApiBearerAuth('logged-in')
export class UserController {
  @Get('me')
  @ApiOkResponse({
    description: 'Returns the profile of the user',
    type: ReturnedUserDto,
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authenticated',
  })
  async getProfile(@User() user: ReturnedUserDto) {
    return user;
  }
}

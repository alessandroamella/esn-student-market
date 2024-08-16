import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsNumberString,
} from 'class-validator';

export class TelegramDataDto {
  @ApiProperty({
    description: 'Telegram user identifier',
    example: '123456789',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'Telegram user username',
    example: 'telegram_user',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Telegram user first name',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    description: 'Telegram user last name',
    example: 'Doe',
  })
  @IsString()
  @IsOptional()
  last_name?: string;

  @ApiProperty({
    description: "URL of the user's profile picture",
    example: 'https://t.me/i/userpic/12345.jpg',
  })
  @IsUrl()
  @IsOptional()
  photo_url?: string;

  @ApiProperty({
    description: 'Unix timestamp of the authentication',
    example: '1616188870',
  })
  @IsNumberString()
  @IsNotEmpty()
  auth_date: string;

  @ApiProperty({
    description: 'Hash to verify data integrity',
    example: 'a1b2c3d4e5f6g7h8i9j0',
  })
  @IsString()
  @IsNotEmpty()
  hash: string;
}

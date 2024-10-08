import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class SignUpUserDto {
  @ApiProperty({ example: 'john_doe', description: 'Unique username' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Unique email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'mypassword123',
    description: 'Password used for login',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: 'https://example.com/picture.jpg',
    description: 'Profile picture URL',
  })
  @IsString()
  @IsOptional()
  picture?: string;
}

export class LoginUserDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address used for login',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'mypassword123',
    description: 'Password used for login',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

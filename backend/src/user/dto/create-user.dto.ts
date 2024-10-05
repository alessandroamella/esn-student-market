import { ApiProperty } from '@nestjs/swagger';
import { Prisma, Role } from '@prisma/client';
import { IsString, IsOptional, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto implements Prisma.UserCreateInput {
  @ApiProperty({ description: 'The username of the user' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'The email address of the user',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: "The URL to the user's picture" })
  @IsString()
  @IsNotEmpty()
  picture: string;

  @ApiProperty({ description: 'The role of the user', default: 'USER' })
  @IsString()
  @IsNotEmpty()
  role: Role;
}

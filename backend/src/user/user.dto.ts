import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Prisma, Role } from '@prisma/client';

export class CreateUserDto implements Omit<Prisma.UserCreateInput, 'role'> {
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
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  picture?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

//   public privateUserSelect: Prisma.UserSelect = {
//   id: true,
//   username: true,
//   picture: true,
//   role: true,
//   localAuth: {
//     select: {
//       email: true,
//       verified: true,
//     },
//   },
// };

class ReturnedLocalAuthDto {
  @ApiProperty({ description: 'The email address of the user' })
  email: string;

  @ApiProperty({ description: 'Whether the email is verified' })
  verified: boolean;
}

export class ReturnedUserDto extends OmitType(CreateUserDto, ['email']) {
  @ApiProperty({ description: 'The ID of the user' })
  id: number;

  @ApiProperty({ description: 'The username of the user' })
  username: string;

  @ApiProperty({
    description: 'The local authentication data of the user',
    type: ReturnedLocalAuthDto,
  })
  localAuth: ReturnedLocalAuthDto;

  @ApiProperty({ description: 'The role of the user', enum: Role })
  role: Role;
}

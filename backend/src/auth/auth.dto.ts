import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class AuthPayloadDto {
  @ApiProperty({
    description: 'User ID',
    example: 1,
  })
  @IsInt()
  id: number;
}

export class AuthTokenSignedDto {
  @ApiProperty({
    description: 'JWT token for authentication',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString()
  @IsNotEmpty()
  access_token: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class AuthPayloadDto {
  @ApiProperty({
    description: 'User ID',
    example: 1,
  })
  @IsInt()
  id: number;
}

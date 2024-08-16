import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsPositive,
  MaxDate,
  MinDate,
  Validate,
  IsArray,
  ArrayNotEmpty,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import moment from 'moment';
import IsValidCategory from 'validators/category';
import { Prisma } from '@prisma/client';

export class CreateItemDto
  implements Omit<Prisma.ItemCreateInput, 'category' | 'user'>
{
  @ApiProperty({
    description: 'Name of the item',
    example: 'Wooden lamp',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the item',
    example: 'Lamp with a wooden base and a fabric shade.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Price of the item',
    example: 20,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'Array of image URLs for the item',
    example: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  images: string[];

  @ApiProperty({
    description: 'Category ID of the item',
    example: 5,
  })
  @IsNumber()
  @IsPositive()
  @Validate(IsValidCategory)
  categoryId: number;

  @ApiProperty({
    description: 'Validity date of the item listing, max 2 months from now',
    example: '2024-12-31T23:59:59.999Z',
    format: 'date-time',
  })
  @IsDate()
  @MaxDate(() => moment().add(2, 'months').toDate())
  @MinDate(() => new Date())
  @Type(() => Date)
  validUntil: Date;
}

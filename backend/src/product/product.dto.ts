import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Name of the product' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Description of the product' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Price of the product' })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Array of image URLs' })
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @ApiProperty({ description: 'Category ID of the product' })
  @IsNumber()
  categoryId: number;

  @ApiProperty({ description: 'Date until the product listing is valid' })
  @IsDateString()
  validUntil: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

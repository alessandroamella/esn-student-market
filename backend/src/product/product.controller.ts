import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { ProductService } from './product.service';
import tryToParseJson from 'try-json-parse';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiCreatedResponse({
    description: 'The product has been successfully created.',
  })
  async create(@Body() createProductDto: CreateProductDto) {
    // TODO: Get userId from auth
    const userId = 1; // Temporary
    return this.productService.create(userId, createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiOkResponse({ description: 'Return all products.' })
  async findAll(
    @Query('skip', ParseIntPipe) skip?: number,
    @Query('take', ParseIntPipe) take?: number,
    @Query('orderBy') orderBy?: string,
  ) {
    const orderByObj = orderBy ? tryToParseJson(orderBy) : undefined;
    return this.productService.findAll(skip, take, undefined, orderByObj);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by id' })
  @ApiOkResponse({ description: 'Return the product.' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiOkResponse({
    description: 'The product has been successfully updated.',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    // TODO: Get userId from auth
    const userId = 1; // Temporary
    return this.productService.update(id, userId, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiOkResponse({
    description: 'The product has been successfully deleted.',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    // TODO: Get userId from auth
    const userId = 1; // Temporary
    return this.productService.remove(id, userId);
  }
}

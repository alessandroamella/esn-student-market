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
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { ProductService } from './product.service';
import tryToParseJson from 'try-json-parse';
import { User } from 'user/user.decorator';
import { ReturnedUserDto } from 'user/user.dto';
import { AuthGuard } from 'auth/auth.guard';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiCreatedResponse({
    description: 'The product has been successfully created.',
  })
  @ApiBearerAuth('logged-in')
  @UseGuards(AuthGuard)
  async create(
    @User() user: ReturnedUserDto,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productService.create(user.id, createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiOkResponse({ description: 'Return all products.' })
  async findAll(
    @Query('skip', ParseIntPipe) skip?: number,
    @Query('take', ParseIntPipe) take?: number,
    @Query('orderBy') orderBy?: string,
    @User() user?: ReturnedUserDto | undefined,
  ) {
    const orderByObj = orderBy ? tryToParseJson(orderBy) : undefined;
    return this.productService.findAll(user, skip, take, orderByObj);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by id' })
  @ApiOkResponse({ description: 'The product' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @User() user?: ReturnedUserDto | undefined,
  ) {
    return this.productService.findOne(id, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiOkResponse({
    description: 'The product has been successfully updated.',
  })
  @ApiNotFoundResponse({
    description: 'Product not found or insufficient permissions.',
  })
  @ApiBearerAuth('logged-in')
  @UseGuards(AuthGuard)
  async update(
    @User() user: ReturnedUserDto,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, user.id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiOkResponse({
    description: 'The product has been successfully deleted.',
  })
  @ApiNotFoundResponse({
    description: 'Product not found or insufficient permissions.',
  })
  @ApiBearerAuth('logged-in')
  @UseGuards(AuthGuard)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @User() user: ReturnedUserDto,
  ) {
    return this.productService.remove(id, user.id);
  }
}

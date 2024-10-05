import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ItemsService } from './items.service';
import { CreateItemDto } from 'file/dto/create-item.dto';
import { UpdateItemDto } from 'file/dto/update-item.dto';
import { Request } from 'express';
import { UserService } from 'user/user.service';
import { LoggedInGuard } from 'auth/loggedin.guard';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiConsumes,
} from '@nestjs/swagger';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @ApiBearerAuth('logged-in')
  @UseGuards(LoggedInGuard)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiOperation({ summary: 'Create a new item' })
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({ description: 'Item successfully created' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(
    @Req() req: Request,
    @Body() createItemDto: CreateItemDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 * 1000 * 10 }), // 10MB
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    files: Express.Multer.File[],
  ) {
    createItemDto.images = files.map((e) => e.destination);
    return this.itemsService.create(req.user!, createItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all items' })
  @ApiOkResponse({ description: 'List of all items' })
  async findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an item by id' })
  @ApiOkResponse({ description: 'Item found' })
  @ApiNotFoundResponse({ description: 'Item not found' })
  async findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an item' })
  @ApiOkResponse({ description: 'Item successfully updated' })
  @ApiNotFoundResponse({ description: 'Item not found' })
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an item' })
  @ApiOkResponse({ description: 'Item successfully deleted' })
  @ApiNotFoundResponse({ description: 'Item not found' })
  async remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }
}

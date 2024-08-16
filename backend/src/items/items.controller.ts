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
import { ApiBearerAuth } from '@nestjs/swagger';

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
  async findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }
}

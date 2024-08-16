import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateItemDto } from 'file/dto/create-item.dto';
import { UpdateItemDto } from 'file/dto/update-item.dto';
import { User } from '@prisma/client';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  async create(user: User, createItemDto: CreateItemDto) {
    return this.prisma.item.create({
      data: {
        name: createItemDto.name,
        description: createItemDto.description,
        price: createItemDto.price,
        sold: false,
        validUntil: createItemDto.validUntil,
        category: {
          connect: {
            id: createItemDto.categoryId,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  async categoryExists(id: number) {
    return this.prisma.category.findUnique({ where: { id } });
  }

  async findAll() {
    return this.prisma.item.findMany();
  }

  async findOne(id: number) {
    return this.prisma.item.findUnique({ where: { id } });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    return this.prisma.item.update({
      where: { id },
      data: updateItemDto,
    });
  }

  async remove(id: number) {
    return this.prisma.item.delete({ where: { id } });
  }
}

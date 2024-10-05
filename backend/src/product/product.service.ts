import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  private itemSelect: Prisma.ItemSelect = {
    id: true,
    name: true,
    price: true,
    category: {
      select: {
        id: true,
        name: true,
      },
    },
    user: {
      select: {
        id: true,
        username: true,
        picture: true,
      },
    },
  };

  async create(userId: number, createProductDto: CreateProductDto) {
    return this.prisma.item.create({
      data: {
        ...createProductDto,
        userId,
      },
      select: this.itemSelect,
    });
  }

  async findAll(skip?: number, take?: number, where?: any, orderBy?: any) {
    return this.prisma.item.findMany({
      skip,
      take,
      where,
      orderBy,
      select: this.itemSelect,
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.item.findUnique({
      where: { id },
      select: this.itemSelect,
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(id: number, userId: number, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.item.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (product.userId !== userId) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return this.prisma.item.update({
      where: { id },
      data: updateProductDto,
      select: this.itemSelect,
    });
  }

  async remove(id: number, userId: number) {
    const product = await this.prisma.item.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (product.userId !== userId) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return this.prisma.item.delete({
      where: { id },
      select: this.itemSelect,
    });
  }
}

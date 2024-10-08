import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { Prisma, Role } from '@prisma/client';
import { ReturnedUserDto } from 'user/user.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  private itemSelect: Prisma.ProductSelect = {
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

  async categoryExists(id: number) {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }

  async create(userId: number, createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        ...createProductDto,
        userId,
      },
      select: this.itemSelect,
    });
  }

  async findAll(
    user?: ReturnedUserDto,
    skip?: number,
    take?: number,
    orderBy?: any,
  ) {
    return this.prisma.product.findMany({
      skip,
      take,
      where: user ? { onlyForRegistered: false } : undefined,
      orderBy,
      select: this.itemSelect,
    });
  }

  async findOne(id: number, user?: ReturnedUserDto) {
    const product = await this.prisma.product.findUnique({
      where: { id, onlyForRegistered: user ? false : undefined },
      select: this.itemSelect,
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  private async canModifyProduct(id: number, userId: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: {
        userId: true,
        user: {
          select: {
            role: true,
          },
        },
      },
    });

    if (
      !product ||
      (product.userId !== userId &&
        !([Role.ESN, Role.OWNER] as Role[]).includes(product.user.role))
    ) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(id: number, userId: number, updateProductDto: UpdateProductDto) {
    await this.canModifyProduct(id, userId);

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
      select: this.itemSelect,
    });
  }

  async remove(id: number, userId: number) {
    await this.canModifyProduct(id, userId);

    return this.prisma.product.delete({
      where: { id },
      select: this.itemSelect,
    });
  }
}

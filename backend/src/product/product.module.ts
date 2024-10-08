import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { UserModule } from 'user/user.module';

@Module({
  providers: [ProductService],
  controllers: [ProductController],
  imports: [PrismaModule, UserModule],
  exports: [ProductService],
})
export class ProductModule {}

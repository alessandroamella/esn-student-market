import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { UserModule } from 'user/user.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  providers: [ItemsService],
  controllers: [ItemsController],
  imports: [UserModule, PrismaModule],
})
export class ItemsModule {}

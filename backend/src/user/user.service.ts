import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User, Prisma, Constraints } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'prisma/prisma.service';
import { Logger } from 'winston';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NullableType } from 'joi';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    this.addVutEmailConstraint();
  }

  public privateUserSelect: Prisma.UserSelect = {
    id: true,
    email: true,
    username: true,
    picture: true,
    role: true,
  };
  public publicUserSelect: Prisma.UserSelect = {
    id: true,
    username: true,
    picture: true,
  };

  private async addVutEmailConstraint() {
    await this.prisma.userRegistrationConstraint.upsert({
      create: {
        constraint: Constraints.EMAIL_ENDS_WITH,
        acceptedValues: ['.vutbr.cz', '.vut.cz', '@vutbr.cz', '@vut.cz'],
        field: 'email',
      },
      update: {
        constraint: Constraints.EMAIL_ENDS_WITH,
        acceptedValues: ['.vutbr.cz', '.vut.cz', '@vutbr.cz', '@vut.cz'],
        field: 'email',
      },
      where: {
        constraint_field: {
          constraint: Constraints.EMAIL_ENDS_WITH,
          field: 'email',
        },
      },
    });
  }

  /**
   * Throws BadRequestException if error occurs
   */
  private async checkSatisfiesConstraints(user: {
    email: string;
  }): Promise<void> {
    const constraints = await this.prisma.userRegistrationConstraint.findMany();

    for (const c of constraints) {
      switch (c.constraint) {
        case Constraints.EMAIL_ENDS_WITH: {
          if (c.acceptedValues.every((v) => !user.email.endsWith(v))) {
            this.logger.debug(
              `User email ${user.email} doesn't end with: ${c.acceptedValues.join(',')}`,
            );
            throw new BadRequestException(Constraints.EMAIL_ENDS_WITH);
          }
          break;
        }
        default: {
          this.logger.error(
            'Constraint check not implemented: ' + c.constraint,
          );
        }
      }
    }
  }

  async upsert(params: {
    where: Prisma.UserWhereUniqueInput;
    create: CreateUserDto;
    update: UpdateUserDto;
  }): Promise<User> {
    const { where, create, update } = params;
    return this.prisma.user.upsert({
      where,
      create,
      update,
    });
  }

  async create(createUserDto: Prisma.UserCreateInput): Promise<User> {
    if (createUserDto.email) {
      await this.checkSatisfiesConstraints({
        email: createUserDto.email!,
      });
    }
    return this.prisma.user.create({
      data: createUserDto,
      select: this.privateUserSelect,
    });
  }

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    select?: Prisma.UserSelect,
  ): Promise<NullableType<User>> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      select,
    });
  }
}

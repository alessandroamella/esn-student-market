import { Inject, Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ProductService } from 'product/product.service';
import { Logger } from 'winston';

@ValidatorConstraint({ name: 'isValidCategory', async: true })
@Injectable()
class IsValidCategory implements ValidatorConstraintInterface {
  constructor(
    private readonly productService: ProductService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async validate(value: unknown) {
    return (
      typeof value === 'number' &&
      !!(await this.productService.categoryExists(value))
    );
  }

  defaultMessage(arguments_: ValidationArguments) {
    this.logger.debug(`Category not found: ${arguments_.value}`);
    return `Category with ID ${arguments_.value} not found`;
  }
}

export default IsValidCategory;

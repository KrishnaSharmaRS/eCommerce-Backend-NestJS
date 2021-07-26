import { IsOptional, Min } from "class-validator";

import { IProductCreation } from "./products.types";
import { IsStringLength } from "../../helpers/custom-validators";

export class CreateProductDto implements IProductCreation {
  @IsStringLength({ min: 1, max: 100 })
  title: string;

  @IsStringLength({ min: 1, max: 1500 })
  description: string;

  @IsStringLength({ min: 5, max: 50 })
  sku: string;

  @IsStringLength({ min: 1, max: 50 })
  size: string;

  @IsStringLength({ min: 2, max: 50 })
  color: string;

  @Min(0)
  stock: number;
}

export class UpdateProductDto implements IProductCreation {
  @IsOptional()
  @IsStringLength({ min: 1, max: 100 })
  title: string;

  @IsOptional()
  @IsStringLength({ min: 1, max: 1500 })
  description: string;

  @IsOptional()
  @IsStringLength({ min: 5, max: 50 })
  sku: string;

  @IsOptional()
  @IsStringLength({ min: 1, max: 50 })
  size: string;

  @IsOptional()
  @IsStringLength({ min: 2, max: 50 })
  color: string;

  @IsOptional()
  @Min(0)
  stock: number;
}

import { IsOptional, Min, Max, IsUUID } from "class-validator";

import { IsStringLength } from "src/helpers/custom-validators";
import { ICartItemCreation } from "./cart-items.types";

export class CreateCartItemDto implements ICartItemCreation {
  @Min(1)
  @Max(10)
  quantity: number;

  @IsStringLength({ min: 2, max: 20 })
  color: string;

  @IsStringLength({ min: 5, max: 20 })
  size: string;

  @IsUUID()
  productId: string;

  @IsUUID()
  userId: string;
}

export class UpdateCartItemDto implements ICartItemCreation {
  @IsOptional()
  @Min(1)
  @Max(10)
  quantity: number;

  @IsOptional()
  @IsStringLength({ min: 2, max: 20 })
  color: string;

  @IsOptional()
  @IsStringLength({ min: 5, max: 20 })
  size: string;

  @IsOptional()
  @IsUUID()
  productId: string;

  @IsOptional()
  @IsUUID()
  userId: string;
}

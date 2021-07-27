import { IsOptional, Min, IsUUID } from "class-validator";

import { IOrderProductCreation } from "./order-products.types";

export class CreateOrderProductDto implements IOrderProductCreation {
  @Min(1)
  price: number;

  @Min(1)
  quantity: number;

  @IsUUID()
  productId: string;

  @IsUUID()
  orderId: string;
}

export class UpdateOrderProductDto implements IOrderProductCreation {
  @IsOptional()
  @Min(1)
  price: number;

  @IsOptional()
  @Min(1)
  quantity: number;

  @IsOptional()
  @IsUUID()
  productId: string;

  @IsOptional()
  @IsUUID()
  orderId: string;
}

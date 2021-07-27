import { IsOptional, Min, IsUUID, IsDateString, IsIn } from "class-validator";

import { EOrderStatus, orderStatuses } from "./order.model";
import { IOrderCreation } from "./orders.types";

export class CreateOrderDto implements IOrderCreation {
  @Min(1)
  amount: number;

  @Min(0)
  discount: number;

  @IsIn(orderStatuses)
  status: EOrderStatus;

  @IsOptional()
  @IsUUID()
  couponId: string;

  @IsUUID()
  userId: string;
}

export class UpdateOrderDto {
  @IsOptional()
  @IsDateString()
  deliveryDate: string;

  @IsOptional()
  @IsIn(orderStatuses)
  status: EOrderStatus;

  @IsOptional()
  @IsUUID()
  couponId: string;
}

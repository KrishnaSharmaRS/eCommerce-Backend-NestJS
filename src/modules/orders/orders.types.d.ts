import { Optional } from "sequelize/types";
import { IModel, OptionalCreationAttributes } from "src/utilities/global";
import { EOrderStatus } from "./order.model";

export interface IOrder extends IModel {
  amount: number;
  discount: number;
  orderDate: string;
  deliveryDate: string;
  status: EOrderStatus;
  couponId: string;
  userId: string;
}

export type TOrderOptionalAttributes = "status" | "orderDate" | "deliveryDate" | OptionalCreationAttributes;

export type IOrderCreation = Optional<IOrder, TOrderOptionalAttributes>;

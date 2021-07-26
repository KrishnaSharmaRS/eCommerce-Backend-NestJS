import { Optional } from "sequelize/types";
import { IModel, OptionalCreationAttributes } from "src/utilities/global";

export interface IOrder extends IModel {
  amount: number;
  discount: number;
  orderDate: Date;
  deliveryDate: Date;
  status: string;
  couponId: string;
  userId: string;
}

export type TOrderOptionalAttributes = "status" | "orderDate" | OptionalCreationAttributes;

export type IOrderCreation = Optional<IOrder, TOrderOptionalAttributes>;

import { Optional } from "sequelize/types";
import { IModel, OptionalCreationAttributes } from "src/utilities/global";

export interface IOrderProduct extends IModel {
  price: number;
  quantity: number;
  productId: string;
  orderId: string;
}

export type TOrderProductOptionalAttributes = OptionalCreationAttributes;

export type IOrderProductCreation = Optional<IOrderProduct, TOrderProductOptionalAttributes>;

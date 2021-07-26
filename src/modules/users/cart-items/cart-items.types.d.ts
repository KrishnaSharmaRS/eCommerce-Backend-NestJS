import { Optional } from "sequelize/types";
import { IModel, OptionalCreationAttributes } from "src/utilities/global";

export interface ICartItem extends IModel {
  quantity: number;
  color: string;
  size: string;
  productId: string;
  userId: string;
}

export type TCartItemOptionalAttributes = OptionalCreationAttributes;

export type ICartItemCreation = Optional<ICartItem, TCartItemOptionalAttributes>;

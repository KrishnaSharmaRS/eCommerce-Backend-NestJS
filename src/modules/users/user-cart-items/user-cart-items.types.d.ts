import { Optional } from "sequelize/types";
import { IModel, OptionalCreationAttributes } from "src/utilities/global";

export interface IUserCartItem extends IModel {
  quantity: number;
  color: string;
  size: string;
  productId: string;
  userId: string;
}

export type TCartOptionalAttributes = OptionalCreationAttributes;

export type IUserCartItemCreation = Optional<IUserCartItem, TCartOptionalAttributes>;

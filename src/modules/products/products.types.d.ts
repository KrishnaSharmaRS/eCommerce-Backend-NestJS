import { Optional } from "sequelize/types";
import { IModel, OptionalCreationAttributes } from "src/utilities/global";

export interface IProduct extends IModel {
  title: string;
  description: string;
  sku: string;
  size: string;
  color: string;
  stock: number;
  isActive: boolean;
}

export type TProductOptionalAttributes = "isActive" | OptionalCreationAttributes;

export type IProductCreation = Optional<IProduct, TProductOptionalAttributes>;

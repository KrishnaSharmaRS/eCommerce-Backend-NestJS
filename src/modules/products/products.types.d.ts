import { Optional } from "sequelize/types";
import { IModel, OptionalCreationAttributes } from "src/utilities/global";

export interface IProduct extends IModel {
  title: string;
  description: string;
  sku: string;
  price: number;
  stock: number;
  images: string;
  isActive: boolean;
}

export type TProductOptionalAttributes = "isActive" | "images" | OptionalCreationAttributes;

export type IProductCreation = Optional<IProduct, TProductOptionalAttributes>;

import { Optional } from "sequelize/types";
import { IModel, OptionalCreationAttributes } from "src/utilities/global";

export interface IUserAddress extends IModel {
  landmark: string;
  apartment: string;
  street: string;
  area: string;
  city: string;
  state: string;
  country: string;
  zipCode: number;
  userId: string;
}

export type TUserOptionalAttributes = OptionalCreationAttributes;

export type IUserAddressCreation = Optional<IUserAddress, TUserOptionalAttributes>;

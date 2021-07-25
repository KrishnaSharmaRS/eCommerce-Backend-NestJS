import { Optional } from "sequelize/types";
import { IModel, OptionalCreationAttributes } from "src/utilities/global";

export interface IUser extends IModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: number;
  countryCode: number;
  profilePicture: string | null;
}

export type TUserOptionalAttributes = "profilePicture" | "phone" | "countryCode" | OptionalCreationAttributes;

export type IUserCreation = Optional<IUser, TUserOptionalAttributes>;

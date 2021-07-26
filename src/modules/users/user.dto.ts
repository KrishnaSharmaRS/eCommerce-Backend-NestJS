import { IsEmail, IsInt, IsOptional, IsString, IsUrl } from "class-validator";

import { IUserCreation } from "./users.types";
import { IsStringLength } from "../../helpers/custom-validators";

export class CreateUserDto implements IUserCreation {
  @IsStringLength({ min: 2, max: 20 })
  firstName: string;

  @IsStringLength({ min: 2, max: 20 })
  lastName: string;

  @IsEmail()
  email: string;

  @IsStringLength({ min: 8, max: 20 })
  password: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  profilePicture: string;

  @IsInt()
  @IsOptional()
  phone: number;

  @IsInt()
  @IsOptional()
  countryCode: number;
}

export class UpdateUserDto implements IUserCreation {
  @IsOptional()
  @IsStringLength({ min: 2, max: 20 })
  firstName: string;

  @IsOptional()
  @IsStringLength({ min: 2, max: 20 })
  lastName: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsStringLength({ min: 8, max: 20 })
  password: string;

  @IsOptional()
  @IsUrl()
  profilePicture: string;

  @IsInt()
  @IsOptional()
  phone: number;

  @IsInt()
  @IsOptional()
  countryCode: number;
}

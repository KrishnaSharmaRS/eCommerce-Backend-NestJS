import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength, MinLength } from "class-validator";
import { IsStringLength } from "src/helpers/custom-validators";

import { IUserCreation } from "./users.types";

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
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  @IsOptional()
  firstName: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  @IsOptional()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @IsOptional()
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

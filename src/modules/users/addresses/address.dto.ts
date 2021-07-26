import { IsOptional, Min, Max, IsUUID } from "class-validator";

import { IsStringLength } from "src/helpers/custom-validators";
import { IAddressCreation } from "./addresses.types";

export class CreateAddressDto implements IAddressCreation {
  @IsStringLength({ min: 0, max: 50 })
  landmark: string;

  @IsStringLength({ min: 0, max: 20 })
  apartment: string;

  @IsStringLength({ min: 5, max: 20 })
  street: string;

  @IsStringLength({ min: 2, max: 20 })
  area: string;

  @IsStringLength({ min: 2, max: 20 })
  city: string;

  @IsStringLength({ min: 2, max: 20 })
  state: string;

  @IsStringLength({ min: 2, max: 20 })
  country: string;

  @IsUUID()
  userId: string;

  @Min(100000)
  @Max(999999)
  zipCode: number;
}

export class UpdateAddressDto implements IAddressCreation {
  @IsOptional()
  @IsStringLength({ min: 0, max: 50 })
  landmark: string;

  @IsOptional()
  @IsStringLength({ min: 0, max: 20 })
  apartment: string;

  @IsOptional()
  @IsStringLength({ min: 5, max: 20 })
  street: string;

  @IsOptional()
  @IsStringLength({ min: 2, max: 20 })
  area: string;

  @IsOptional()
  @IsStringLength({ min: 2, max: 20 })
  city: string;

  @IsOptional()
  @IsStringLength({ min: 2, max: 20 })
  state: string;

  @IsOptional()
  @IsStringLength({ min: 2, max: 20 })
  country: string;

  @IsOptional()
  @IsUUID()
  userId: string;

  @IsOptional()
  @Min(100000)
  @Max(999999)
  zipCode: number;
}

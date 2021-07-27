import { IsDate, IsIn, IsOptional, Min } from "class-validator";

import { IsStringLength } from "../../helpers/custom-validators";
import { ICouponCreation } from "./coupons.types";
import { couponAmountTypes, couponStatuses, ECouponAmountType, ECouponStatus } from "./coupon.model";

export class CreateCouponDto implements ICouponCreation {
  @IsStringLength({ min: 3, max: 50 })
  title: string;

  @IsStringLength({ min: 5, max: 25 })
  code: string;

  @Min(1)
  amount: number;

  @IsIn(couponAmountTypes)
  amountType: ECouponAmountType;

  @Min(0)
  maxUseLimit: number;

  @Min(0)
  maxUsePerUser: number;

  @IsDate()
  validUpto: Date;
}

export class UpdateCouponDto implements ICouponCreation {
  @IsOptional()
  @IsStringLength({ min: 3, max: 50 })
  title: string;

  @IsOptional()
  @IsStringLength({ min: 5, max: 25 })
  code: string;

  @IsOptional()
  @Min(1)
  amount: number;

  @IsOptional()
  @IsIn(couponAmountTypes)
  amountType: ECouponAmountType;

  @IsOptional()
  @Min(0)
  maxUseLimit: number;

  @IsOptional()
  @Min(0)
  maxUsePerUser: number;

  @IsOptional()
  @IsDate()
  validUpto: Date;

  @IsIn(couponStatuses)
  status: ECouponStatus;
}

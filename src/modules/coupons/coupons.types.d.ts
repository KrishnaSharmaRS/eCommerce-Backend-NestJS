import { Optional } from "sequelize/types";
import { IModel, OptionalCreationAttributes } from "src/utilities/global";
import { ECouponAmountType, ECouponStatus } from "./coupon.model";

export interface ICoupon extends IModel {
  title: string;
  code: string;
  amount: number;
  amountType: ECouponAmountType;
  status: ECouponStatus;
  maxUseLimit: number;
  maxUsePerUser: number;
  validUpto: Date;
}

export type TCouponOptionalAttributes = OptionalCreationAttributes;

export type ICouponCreation = Optional<ICoupon, TCouponOptionalAttributes>;

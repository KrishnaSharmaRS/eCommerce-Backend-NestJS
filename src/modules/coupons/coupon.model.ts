import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

import { ICoupon, ICouponCreation } from "./coupons.types";
import { OrderModel } from "../orders/order.model";
import { IOrder } from "../orders/orders.types";

export enum ECouponStatus {
  active = "Active",
  inactive = "Inactive",
}

export const couponStatuses = Object.values(ECouponStatus);

export enum ECouponAmountType {
  price = "Price",
  percentage = "Percentage",
}

export const couponAmountTypes = Object.values(ECouponAmountType);

@Table({ tableName: "coupons", paranoid: true, modelName: "coupon", underscored: false })
export class CouponModel extends Model<ICoupon, ICouponCreation> implements ICoupon {
  @Column({ allowNull: false, type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING })
  title: string;

  @Column({ type: DataType.STRING, unique: true })
  code: string;

  @Column({ type: DataType.INTEGER.UNSIGNED })
  amount: number;

  @Column({ type: DataType.ENUM, values: couponAmountTypes, defaultValue: ECouponAmountType.price })
  amountType: ECouponAmountType;

  @Column({ type: DataType.ENUM, values: couponStatuses, defaultValue: ECouponStatus.active })
  status: ECouponStatus;

  @Column({ type: DataType.INTEGER.UNSIGNED })
  maxUseLimit: number;

  @Column({ type: DataType.INTEGER.UNSIGNED })
  maxUsePerUser: number;

  @Column({ type: DataType.DATE })
  validUpto: Date;

  @Column({})
  createdAt: Date;

  @Column({})
  updatedAt: Date;

  @Column({})
  deletedAt: Date | null;

  @HasMany(() => OrderModel, { constraints: false, foreignKey: "couponId", as: "orders" })
  orders: IOrder[];
}

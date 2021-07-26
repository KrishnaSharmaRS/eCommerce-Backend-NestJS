import { BelongsTo, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

import { IOrder, IOrderCreation } from "./orders.types";
import { CouponModel } from "../coupons/coupon.model";
import { UserModel } from "../users/user.model";
import { OrderProductModel } from "./order-products/order-product.model";
import { ICoupon } from "../coupons/coupons.types";
import { IUser } from "../users/users.types";
import { IProduct } from "../products/products.types";

export enum EOrderStatus {
  processing = "Processing",
  shipped = "Shipped",
  delivered = "Delivered",
  cancelled = "Cancelled",
}

export const orderStatuses = Object.values(EOrderStatus);

@Table({ tableName: "orders", paranoid: true, modelName: "order", underscored: false })
export class OrderModel extends Model<IOrder, IOrderCreation> implements IOrder {
  @Column({ allowNull: false, type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id: string;

  @Column({ type: DataType.INTEGER.UNSIGNED })
  amount: number;

  @Column({ type: DataType.INTEGER.UNSIGNED })
  discount: number;

  @Column({ type: DataType.ENUM, values: orderStatuses, defaultValue: EOrderStatus.processing })
  status: EOrderStatus;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  orderDate: Date;

  @Column({ type: DataType.DATE })
  deliveryDate: Date;

  @Column({ type: DataType.UUID })
  couponId: string;

  @Column({ type: DataType.UUID })
  userId: string;

  @Column({})
  createdAt: Date;

  @Column({})
  updatedAt: Date;

  @Column({})
  deletedAt: Date | null;

  @BelongsTo(() => CouponModel, { foreignKey: "couponId", as: "coupon", constraints: false })
  coupon: ICoupon;

  @BelongsTo(() => UserModel, { foreignKey: "userId", as: "user", constraints: false })
  user: IUser;

  @HasMany(() => OrderProductModel, { foreignKey: "orderId", as: "products", constraints: false })
  products: IProduct[];
}

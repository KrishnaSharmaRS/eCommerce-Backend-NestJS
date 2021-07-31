import { BelongsTo, Column, DataType, Model, Table } from "sequelize-typescript";

import { IProduct, IProductCreation } from "./products.types";
import { CouponModel } from "../coupons/coupon.model";
import { UserModel } from "../users/user.model";
import { ICoupon } from "../coupons/coupons.types";

@Table({ tableName: "products", paranoid: true, modelName: "products", underscored: false })
export class ProductModel extends Model<IProduct, IProductCreation> implements IProduct {
  @Column({ allowNull: false, type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING })
  title: string;

  @Column({ type: DataType.STRING })
  description: string;

  @Column({ type: DataType.STRING })
  sku: string;

  @Column({ type: DataType.TEXT })
  images: string;

  @Column({ type: DataType.INTEGER.UNSIGNED })
  price: number;

  @Column({ type: DataType.INTEGER.UNSIGNED })
  stock: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActive: boolean;

  @Column({})
  createdAt: Date;

  @Column({})
  updatedAt: Date;

  @Column({})
  deletedAt: Date | null;

  @BelongsTo(() => CouponModel, { foreignKey: "couponId", as: "coupon", constraints: false })
  coupon: ICoupon;

  @BelongsTo(() => UserModel, { foreignKey: "userId", as: "user", constraints: false })
  user: ICoupon;
}

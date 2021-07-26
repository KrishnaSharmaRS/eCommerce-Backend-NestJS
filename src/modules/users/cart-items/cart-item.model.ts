import { BelongsTo, Column, DataType, Model, Table } from "sequelize-typescript";

import { ICartItem, ICartItemCreation } from "./cart-items.types";
import { UserModel } from "src/modules/users/user.model";
import { IUser } from "../users.types";
import { IProduct } from "src/modules/products/products.types";
import { ProductModel } from "src/modules/products/product.model";

@Table({ tableName: "cart_items", paranoid: true, modelName: "cartItem", underscored: false })
export class CartItemModel extends Model<ICartItem, ICartItemCreation> implements ICartItem {
  @Column({ allowNull: false, type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id: string;

  @Column({ type: DataType.INTEGER.UNSIGNED })
  quantity: number;

  @Column({ type: DataType.STRING })
  color: string;

  @Column({ type: DataType.STRING })
  size: string;

  @Column({ type: DataType.UUID })
  productId: string;

  @Column({ type: DataType.UUID })
  userId: string;

  @Column({})
  createdAt: Date;

  @Column({})
  updatedAt: Date;

  @Column({})
  deletedAt: Date | null;

  @BelongsTo(() => ProductModel, { foreignKey: "productId", constraints: false, as: "product" })
  product: IProduct;

  @BelongsTo(() => UserModel, { foreignKey: "userId", constraints: false, as: "user" })
  user: IUser;
}

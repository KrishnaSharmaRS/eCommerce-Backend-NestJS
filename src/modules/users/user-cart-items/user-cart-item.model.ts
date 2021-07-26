import { BelongsTo, Column, DataType, Model, Table } from "sequelize-typescript";

import { IUserCartItem, IUserCartItemCreation } from "./user-cart-items.types";
import { UserModel } from "src/modules/users/user.model";
import { IUser } from "../users.types";

@Table({ tableName: "cart_items", paranoid: true, modelName: "userCartItem", underscored: false })
export class UserCartItemModel extends Model<IUserCartItem, IUserCartItemCreation> implements IUserCartItem {
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

  @BelongsTo(() => UserModel, { foreignKey: "userId", constraints: false, as: "user" })
  user: IUser;
}

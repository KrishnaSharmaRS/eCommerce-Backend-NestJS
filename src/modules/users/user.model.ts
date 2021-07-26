import { col, fn } from "sequelize";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { genSaltSync, hashSync } from "bcryptjs";

import { IUser, IUserCreation } from "./users.types";
import { CartItemModel } from "./cart-items/cart-item.model";
import { AddressModel } from "./addresses/address.model";
import { ICartItem } from "./cart-items/cart-items.types";
import { IAddress } from "./addresses/addresses.types";

@Table({ tableName: "users", paranoid: true, modelName: "user", underscored: false, indexes: [{ unique: true, name: "user_email", fields: [fn("lower", col("email"))] }] })
export class UserModel extends Model<IUser, IUserCreation> implements IUser {
  @Column({ allowNull: false, type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING })
  firstName: string;

  @Column({ type: DataType.STRING })
  lastName: string;

  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @Column({
    type: DataType.STRING,
    set(value: string) {
      this.setDataValue("password", hashSync(value, genSaltSync(10)));
    },
  })
  password: string;

  @Column({ type: DataType.STRING })
  profilePicture: string;

  @Column({ type: DataType.BIGINT.UNSIGNED })
  phone: number;

  @Column({ type: DataType.SMALLINT.UNSIGNED })
  countryCode: number;

  @Column({ defaultValue: true })
  isActive: boolean;

  @Column({})
  createdAt: Date;

  @Column({})
  updatedAt: Date;

  @Column({})
  deletedAt: Date | null;

  @HasMany(() => CartItemModel, { constraints: false, as: "cartItems", foreignKey: "userId" })
  cartItems: ICartItem[];

  @HasMany(() => AddressModel, { constraints: false, as: "addresses", foreignKey: "userId" })
  addresses: IAddress[];
}

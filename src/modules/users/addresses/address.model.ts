import { BelongsTo, Column, DataType, Model, Table } from "sequelize-typescript";

import { IAddress, IAddressCreation } from "./addresses.types";
import { UserModel } from "../user.model";
import { IUser } from "../users.types";

@Table({ tableName: "addresses", paranoid: true, modelName: "address", underscored: false })
export class AddressModel extends Model<IAddress, IAddressCreation> implements IAddress {
  @Column({ allowNull: false, type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING })
  landmark: string;

  @Column({ type: DataType.STRING })
  apartment: string;

  @Column({ type: DataType.STRING })
  area: string;

  @Column({ type: DataType.STRING })
  city: string;

  @Column({ type: DataType.STRING })
  state: string;

  @Column({ type: DataType.STRING })
  country: string;

  @Column({ type: DataType.INTEGER.UNSIGNED })
  zipCode: number;

  @Column({ type: DataType.STRING })
  street: string;

  @Column({ type: DataType.UUID })
  userId: string;

  @Column({})
  createdAt: Date;

  @Column({})
  updatedAt: Date;

  @Column({})
  deletedAt: Date | null;

  @BelongsTo(() => UserModel, { constraints: false, as: "user", foreignKey: "userId" })
  user: IUser;
}

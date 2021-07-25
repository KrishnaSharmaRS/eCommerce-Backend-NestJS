import { Column, DataType, Model, Table } from "sequelize-typescript";
import { genSaltSync, hashSync } from "bcryptjs";

import { IUser, IUserCreation } from "./users.types";

@Table({ tableName: "users", paranoid: true, modelName: "user", underscored: false })
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
}

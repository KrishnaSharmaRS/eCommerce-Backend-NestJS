import { BelongsTo, Column, DataType, Model, Table } from "sequelize-typescript";

import { IOrderProduct, IOrderProductCreation } from "./order-products.types";
import { OrderModel } from "../order.model";
import { ProductModel } from "src/modules/products/product.model";
import { IOrder } from "../orders.types";
import { IProduct } from "src/modules/products/products.types";

@Table({ tableName: "order_products", paranoid: true, modelName: "orderProduct", underscored: false })
export class OrderProductModel extends Model<IOrderProduct, IOrderProductCreation> implements IOrderProduct {
  @Column({ allowNull: false, type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id: string;

  @Column({ type: DataType.INTEGER.UNSIGNED })
  price: number;

  @Column({ type: DataType.INTEGER.UNSIGNED })
  quantity: number;

  @Column({ type: DataType.UUID })
  productId: string;

  @Column({ type: DataType.UUID })
  orderId: string;

  @Column({})
  createdAt: Date;

  @Column({})
  updatedAt: Date;

  @Column({})
  deletedAt: Date | null;

  @BelongsTo(() => OrderModel, { foreignKey: "orderId", as: "order", constraints: false })
  order: IOrder;

  @BelongsTo(() => ProductModel, { foreignKey: "productId", as: "product", constraints: false })
  product: IProduct;
}

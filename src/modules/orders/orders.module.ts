import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { OrderProductsModule } from "./order-products/order-products.module";
import { OrderModel } from "./order.model";

@Module({
  providers: [OrdersService],
  controllers: [OrdersController],
  imports: [SequelizeModule.forFeature([OrderModel]), OrderProductsModule],
})
export class OrdersModule {}

import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { OrderProductsService } from "./order-products.service";
import { OrderProductsController } from "./order-products.controller";
import { OrderProductModel } from "./order-product.model";

@Module({
  providers: [OrderProductsService],
  controllers: [OrderProductsController],
  imports: [SequelizeModule.forFeature([OrderProductModel])],
})
export class OrderProductsModule {}

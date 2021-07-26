import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { ProductModel } from "./product.model";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [SequelizeModule.forFeature([ProductModel])],
})
export class ProductsModule {}

import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { CartItemsService } from "./cart-items.service";
import { CartItemsController } from "./cart-items.controller";
import { CartItemModel } from "./cart-item.model";

@Module({
  providers: [CartItemsService],
  controllers: [CartItemsController],
  imports: [SequelizeModule.forFeature([CartItemModel])],
})
export class CartItemsModule {}

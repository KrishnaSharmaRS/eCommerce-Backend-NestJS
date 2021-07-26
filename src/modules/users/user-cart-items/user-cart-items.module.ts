import { Module } from "@nestjs/common";
import { UserCartItemsService } from "./user-cart-items.service";

import { UserCartItemsController } from "./user-cart-items.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserCartItemModel } from "./user-cart-item.model";

@Module({
  imports: [SequelizeModule.forFeature([UserCartItemModel])],
  providers: [UserCartItemsService],
  controllers: [UserCartItemsController],
})
export class UserCartItemsModule {}

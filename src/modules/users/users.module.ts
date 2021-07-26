import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UserModel } from "./user.model";
import { AddressesModule } from "./addresses/addresses.module";
import { CartItemsModule } from "./cart-items/cart-items.module";

@Module({
  imports: [SequelizeModule.forFeature([UserModel]), AddressesModule, CartItemsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [SequelizeModule],
})
export class UsersModule {}

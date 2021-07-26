import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UserModel } from "./user.model";
import { UserAddressesModule } from "./user-addresses/user-addresses.module";
import { UserCartItemsModule } from "./user-cart-items/user-cart-items.module";

@Module({
  imports: [SequelizeModule.forFeature([UserModel]), UserAddressesModule, UserCartItemsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [SequelizeModule, UserAddressesModule, UserCartItemsModule],
})
export class UsersModule {}

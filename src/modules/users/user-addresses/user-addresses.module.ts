import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { UserAddressModel } from "./user-address.model";
import { UserAddressesController } from "./user-addresses.controller";
import { UserAddressesService } from "./user-addresses.service";

@Module({
  imports: [SequelizeModule.forFeature([UserAddressModel])],
  controllers: [UserAddressesController],
  providers: [UserAddressesService],
})
export class UserAddressesModule {}

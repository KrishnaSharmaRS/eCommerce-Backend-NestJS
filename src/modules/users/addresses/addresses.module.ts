import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { AddressesService } from "./addresses.service";
import { AddressesController } from "./addresses.controller";
import { AddressModel } from "./address.model";

@Module({
  providers: [AddressesService],
  controllers: [AddressesController],
  imports: [SequelizeModule.forFeature([AddressModel])],
})
export class AddressesModule {}

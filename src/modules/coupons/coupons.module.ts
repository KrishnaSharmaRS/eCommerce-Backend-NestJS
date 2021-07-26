import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { CouponModel } from "./coupon.model";
import { CouponsController } from "./coupons.controller";
import { CouponsService } from "./coupons.service";

@Module({
  controllers: [CouponsController],
  providers: [CouponsService],
  imports: [SequelizeModule.forFeature([CouponModel])],
})
export class CouponsModule {}

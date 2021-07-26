import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { CouponModel } from "./coupon.model";

@Injectable()
export class CouponsService {
  constructor(@InjectModel(CouponModel) private readonly couponModel: typeof CouponModel) {}
}

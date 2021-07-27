import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FindAttributeOptions, UniqueConstraintError } from "sequelize";

import { internalServerErrorMessage } from "src/utilities/utils";
import { CreateCouponDto, UpdateCouponDto } from "./coupon.dto";
import { CouponModel } from "./coupon.model";

@Injectable()
export class CouponsService {
  constructor(@InjectModel(CouponModel) private readonly couponModel: typeof CouponModel) {}

  async getAllCoupons(attributes?: FindAttributeOptions) {
    const coupons = await this.couponModel.findAll({ attributes });

    return coupons;
  }

  async getCouponById(couponId: string, attributes?: FindAttributeOptions) {
    const coupon = await this.couponModel.findOne({ where: { id: couponId }, attributes });

    return coupon;
  }

  async createCoupon(createCouponDto: CreateCouponDto) {
    try {
      const response = await this.couponModel.create(createCouponDto);

      return response;
    } catch (error) {
      if (error instanceof UniqueConstraintError) throw new ConflictException(`A coupon with '${error.errors[0]?.value || createCouponDto.code}' (CODE) already exists!`);

      throw new InternalServerErrorException(internalServerErrorMessage);
    }
  }

  async updateCouponById(couponId: string, updateCouponDto: UpdateCouponDto) {
    const response = await this.couponModel.update(updateCouponDto, { where: { id: couponId } });

    if (!response[0]) throw new NotFoundException(`Invalid Coupon ID: ${couponId}`);

    return response;
  }

  async deleteCouponById(couponId: string) {
    const response = await this.couponModel.destroy({ where: { id: couponId } });

    if (!response) throw new NotFoundException(`Invalid Coupon ID: ${couponId}`);

    return response;
  }
}

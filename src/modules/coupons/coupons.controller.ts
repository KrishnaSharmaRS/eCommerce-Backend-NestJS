import { Body, Controller, Delete, NotFoundException, Param, Patch, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";

import { CreateCouponDto, UpdateCouponDto } from "./coupon.dto";
import { CouponsService } from "./coupons.service";

@Controller("coupons")
@UsePipes(ValidationPipe)
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Post()
  async getAllCoupons() {
    const coupons = await this.couponsService.getAllCoupons();

    return coupons; //.map((coupon) => coupon._attributes);
  }

  @Post("/:couponId")
  async getCouponById(@Param("couponId") couponId: string) {
    const coupon = await this.couponsService.getCouponById(couponId);

    if (!coupon) throw new NotFoundException(`Invalid Coupon ID, No coupon found with ID: ${couponId}`);

    return coupon;
  }

  @Put()
  async createCoupon(@Body() createCouponDto: CreateCouponDto) {
    const response = await this.couponsService.createCoupon(createCouponDto);

    return {
      message: "Coupon created successfully.",
      data: {
        id: response.id,
      },
    };
  }

  @Patch("/:couponId")
  async updateCoupon(@Param("couponId") couponId: string, @Body() updateCouponDto: UpdateCouponDto) {
    await this.couponsService.updateCouponById(couponId, updateCouponDto);

    return {
      message: "Coupon updated successfully.",
    };
  }

  @Delete("/:couponId")
  async deleteCoupon(@Param("couponId") couponId: string) {
    await this.couponsService.deleteCouponById(couponId);

    return {
      message: "Coupon deleted successfully.",
    };
  }
}

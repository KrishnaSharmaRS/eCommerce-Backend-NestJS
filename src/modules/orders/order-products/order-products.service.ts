import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { OrderProductModel } from "./order-product.model";

@Injectable()
export class OrderProductsService {
  constructor(@InjectModel(OrderProductModel) private readonly orderProductModel: typeof OrderProductModel) {}
}

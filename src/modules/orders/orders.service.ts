import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { OrderModel } from "./order.model";

@Injectable()
export class OrdersService {
  constructor(@InjectModel(OrderModel) private readonly orderModel: typeof OrderModel) {}
}

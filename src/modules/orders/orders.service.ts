import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FindAttributeOptions } from "sequelize/types";

import { internalServerErrorMessage } from "src/utilities/utils";
import { CreateOrderDto, UpdateOrderDto } from "./order.dto";
import { OrderModel } from "./order.model";

@Injectable()
export class OrdersService {
  constructor(@InjectModel(OrderModel) private readonly orderModel: typeof OrderModel) {}

  async getAllOrders(attributes?: FindAttributeOptions) {
    const orders = await this.orderModel.findAll({ attributes });

    return orders;
  }

  async getOrderById(orderId: string, attributes?: FindAttributeOptions) {
    const order = await this.orderModel.findOne({ where: { id: orderId }, attributes });

    return order;
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    try {
      const response = await this.orderModel.create(createOrderDto);

      return response;
    } catch (error) {
      //   if (error instanceof UniqueConstraintError) throw new ConflictException(`A order with '${error.errors[0]?.value}' already exists!`);

      throw new InternalServerErrorException(internalServerErrorMessage);
    }
  }

  async updateOrderById(orderId: string, updateOrderDto: UpdateOrderDto) {
    const response = await this.orderModel.update(updateOrderDto, { where: { id: orderId } });

    if (!response[0]) throw new NotFoundException(`Invalid Order ID: ${orderId}`);

    return response;
  }

  async deleteOrderById(orderId: string) {
    const response = await this.orderModel.destroy({ where: { id: orderId } });

    if (!response) throw new NotFoundException(`Invalid Order ID: ${orderId}`);

    return response;
  }
}

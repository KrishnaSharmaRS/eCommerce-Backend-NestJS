import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FindAttributeOptions } from "sequelize/types";

import { internalServerErrorMessage } from "src/utilities/utils";
import { CreateOrderProductDto, UpdateOrderProductDto } from "./order-product.dto";
import { OrderProductModel } from "./order-product.model";

@Injectable()
export class OrderProductsService {
  constructor(@InjectModel(OrderProductModel) private readonly orderProductModel: typeof OrderProductModel) {}

  async getAllOrderProducts(attributes?: FindAttributeOptions) {
    const orderProducts = await this.orderProductModel.findAll({ attributes });

    return orderProducts;
  }

  async getOrderProductById(orderProductId: string, attributes?: FindAttributeOptions) {
    const orderProduct = await this.orderProductModel.findOne({ where: { id: orderProductId }, attributes });

    return orderProduct;
  }

  async createOrderProduct(createOrderProductDto: CreateOrderProductDto) {
    try {
      const response = await this.orderProductModel.create(createOrderProductDto);

      return response;
    } catch (error) {
      //   if (error instanceof UniqueConstraintError) throw new ConflictException(`A orderProduct with '${error.errors[0]?.value}' already exists!`);

      throw new InternalServerErrorException(internalServerErrorMessage);
    }
  }

  async updateOrderProductById(orderProductId: string, updateOrderProductDto: UpdateOrderProductDto) {
    const response = await this.orderProductModel.update(updateOrderProductDto, { where: { id: orderProductId } });

    if (!response[0]) throw new NotFoundException(`Invalid OrderProduct ID: ${orderProductId}`);

    return response;
  }

  async deleteOrderProductById(orderProductId: string) {
    const response = await this.orderProductModel.destroy({ where: { id: orderProductId } });

    if (!response) throw new NotFoundException(`Invalid OrderProduct ID: ${orderProductId}`);

    return response;
  }
}

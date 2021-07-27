import { Body, Controller, Delete, NotFoundException, Param, Patch, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateOrderProductDto, UpdateOrderProductDto } from "./order-product.dto";

import { OrderProductsService } from "./order-products.service";

@Controller("order-products")
@UsePipes(ValidationPipe)
export class OrderProductsController {
  constructor(private readonly orderProductsService: OrderProductsService) {}

  @Post()
  async getAllOrderProducts() {
    const orderProducts = await this.orderProductsService.getAllOrderProducts();

    return orderProducts; //.map((orderProduct) => orderProduct._attributes);
  }

  @Post("/:orderProductId")
  async getOrderProductById(@Param("orderProductId") orderProductId: string) {
    const orderProduct = await this.orderProductsService.getOrderProductById(orderProductId);

    if (!orderProduct) throw new NotFoundException(`Invalid OrderProduct ID, No orderProduct found with ID: ${orderProductId}`);

    return orderProduct;
  }

  @Put()
  async createOrderProduct(@Body() createOrderProductDto: CreateOrderProductDto) {
    const response = await this.orderProductsService.createOrderProduct(createOrderProductDto);

    return {
      message: "OrderProduct created successfully.",
      data: {
        id: response.id,
      },
    };
  }

  @Patch("/:orderProductId")
  async updateOrderProduct(@Param("orderProductId") orderProductId: string, @Body() updateOrderProductDto: UpdateOrderProductDto) {
    await this.orderProductsService.updateOrderProductById(orderProductId, updateOrderProductDto);

    return {
      message: "OrderProduct updated successfully.",
    };
  }

  @Delete("/:orderProductId")
  async deleteOrderProduct(@Param("orderProductId") orderProductId: string) {
    await this.orderProductsService.deleteOrderProductById(orderProductId);

    return {
      message: "OrderProduct deleted successfully.",
    };
  }
}

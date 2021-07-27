import { Body, Controller, Delete, NotFoundException, Param, Patch, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateOrderDto, UpdateOrderDto } from "./order.dto";
import { OrdersService } from "./orders.service";

@Controller("orders")
@UsePipes(ValidationPipe)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async getAllOrders() {
    const orders = await this.ordersService.getAllOrders();

    return orders; //.map((order) => order._attributes);
  }

  @Post("/:orderId")
  async getOrderById(@Param("orderId") orderId: string) {
    const order = await this.ordersService.getOrderById(orderId);

    if (!order) throw new NotFoundException(`Invalid Order ID, No order found with ID: ${orderId}`);

    return order;
  }

  @Put()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const response = await this.ordersService.createOrder(createOrderDto);

    return {
      message: "Order created successfully.",
      data: {
        id: response.id,
      },
    };
  }

  @Patch("/:orderId")
  async updateOrder(@Param("orderId") orderId: string, @Body() updateOrderDto: UpdateOrderDto) {
    await this.ordersService.updateOrderById(orderId, updateOrderDto);

    return {
      message: "Order updated successfully.",
    };
  }

  @Delete("/:orderId")
  async deleteOrder(@Param("orderId") orderId: string) {
    await this.ordersService.deleteOrderById(orderId);

    return {
      message: "Order deleted successfully.",
    };
  }
}

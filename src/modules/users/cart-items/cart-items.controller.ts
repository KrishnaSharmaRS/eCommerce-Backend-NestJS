import { Body, Controller, Delete, NotFoundException, Param, Patch, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";

import { CreateCartItemDto, UpdateCartItemDto } from "./cart-item.dto";
import { CartItemsService } from "./cart-items.service";

@Controller("cart-items")
@UsePipes(ValidationPipe)
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Post()
  async getAllCartItems() {
    const cartItems = await this.cartItemsService.getAllCartItems();

    return cartItems; //.map((cartItem) => cartItem._attributes);
  }

  @Post("/:cartItemId")
  async getCartItemById(@Param("cartItemId") cartItemId: string) {
    const cartItem = await this.cartItemsService.getCartItemById(cartItemId);

    if (!cartItem) throw new NotFoundException(`Invalid CartItem ID, No cartItem found with ID: ${cartItemId}`);

    return cartItem;
  }

  @Put()
  async createCartItem(@Body() createCartItemDto: CreateCartItemDto) {
    const response = await this.cartItemsService.createCartItem(createCartItemDto);

    return {
      message: "CartItem created successfully.",
      data: {
        id: response.id,
      },
    };
  }

  @Patch("/:cartItemId")
  async updateCartItem(@Param("cartItemId") cartItemId: string, @Body() updateCartItemDto: UpdateCartItemDto) {
    await this.cartItemsService.updateCartItemById(cartItemId, updateCartItemDto);

    return {
      message: "CartItem updated successfully.",
    };
  }

  @Delete("/:cartItemId")
  async deleteCartItem(@Param("cartItemId") cartItemId: string) {
    await this.cartItemsService.deleteCartItemById(cartItemId);

    return {
      message: "CartItem deleted successfully.",
    };
  }
}

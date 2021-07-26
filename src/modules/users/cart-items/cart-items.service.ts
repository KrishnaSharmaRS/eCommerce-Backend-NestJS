import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FindAttributeOptions } from "sequelize/types";
import { internalServerErrorMessage } from "src/utilities/utils";
import { CreateCartItemDto, UpdateCartItemDto } from "./cart-item.dto";
import { CartItemModel } from "./cart-item.model";

@Injectable()
export class CartItemsService {
  constructor(@InjectModel(CartItemModel) private readonly cartItemModel: typeof CartItemModel) {}

  async getAllCartItems(attributes?: FindAttributeOptions) {
    const cartItems = await this.cartItemModel.findAll({ attributes });

    return cartItems;
  }

  async getCartItemById(cartItemId: string, attributes?: FindAttributeOptions) {
    const cartItem = await this.cartItemModel.findOne({ where: { id: cartItemId }, attributes });

    return cartItem;
  }

  async createCartItem(createCartItemDto: CreateCartItemDto) {
    try {
      const response = await this.cartItemModel.create(createCartItemDto);

      return response;
    } catch (error) {
      //   if (error instanceof UniqueConstraintError) throw new ConflictException(`A cartItem with '${error.errors[0]?.value}' already exists!`);

      throw new InternalServerErrorException(internalServerErrorMessage);
    }
  }

  async updateCartItemById(cartItemId: string, updateCartItemDto: UpdateCartItemDto) {
    const response = await this.cartItemModel.update(updateCartItemDto, { where: { id: cartItemId } });

    if (!response[0]) throw new NotFoundException(`Invalid CartItem ID: ${cartItemId}`);

    return response;
  }

  async deleteCartItemById(cartItemId: string) {
    const response = await this.cartItemModel.destroy({ where: { id: cartItemId } });

    if (!response) throw new NotFoundException(`Invalid CartItem ID: ${cartItemId}`);

    return response;
  }
}

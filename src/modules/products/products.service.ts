import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { FindAttributeOptions, UniqueConstraintError } from "sequelize";
import { InjectModel } from "@nestjs/sequelize";

import { internalServerErrorMessage } from "src/utilities/utils";
import { CreateProductDto, UpdateProductDto } from "./product.dto";
import { ProductModel } from "./product.model";

@Injectable()
export class ProductsService {
  constructor(@InjectModel(ProductModel) private readonly productModel: typeof ProductModel) {}

  async getAllProducts(attributes?: FindAttributeOptions) {
    const products = await this.productModel.findAll({ attributes });

    return products;
  }

  async getProductById(productId: string, attributes?: FindAttributeOptions) {
    const product = await this.productModel.findOne({ where: { id: productId }, attributes });

    return product;
  }

  async createProduct(createProductDto: CreateProductDto) {
    try {
      const response = await this.productModel.create(createProductDto);

      return response;
    } catch (error) {
      if (error instanceof UniqueConstraintError) throw new ConflictException(`A product with '${error.errors[0]?.value || createProductDto.sku}' (SKU) already exists!`);

      throw new InternalServerErrorException(internalServerErrorMessage);
    }
  }

  async updateProductById(productId: string, updateProductDto: UpdateProductDto) {
    const response = await this.productModel.update(updateProductDto, { where: { id: productId } });

    if (!response[0]) throw new NotFoundException(`Invalid Product ID: ${productId}`);

    return response;
  }

  async deleteProductById(productId: string) {
    const response = await this.productModel.destroy({ where: { id: productId } });

    if (!response) throw new NotFoundException(`Invalid Product ID: ${productId}`);

    return response;
  }
}

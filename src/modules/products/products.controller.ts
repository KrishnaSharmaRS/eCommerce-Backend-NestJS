import { Body, Controller, Delete, NotFoundException, Param, Patch, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateProductDto, UpdateProductDto } from "./product.dto";

import { ProductsService } from "./products.service";

@Controller("products")
@UsePipes(ValidationPipe)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async getAllProducts() {
    const products = await this.productsService.getAllProducts();

    return products; //.map((product) => product._attributes);
  }

  @Post("/:productId")
  async getProductById(@Param("productId") productId: string) {
    const product = await this.productsService.getProductById(productId);

    if (!product) throw new NotFoundException(`Invalid Product ID, No product found with ID: ${productId}`);

    return product;
  }

  @Put()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const response = await this.productsService.createProduct(createProductDto);

    return {
      message: "Product created successfully.",
      data: {
        id: response.id,
      },
    };
  }

  @Patch("/:productId")
  async updateProduct(@Param("productId") productId: string, @Body() updateProductDto: UpdateProductDto) {
    await this.productsService.updateProductById(productId, updateProductDto);

    return {
      message: "Product updated successfully.",
    };
  }

  @Delete("/:productId")
  async deleteProduct(@Param("productId") productId: string) {
    await this.productsService.deleteProductById(productId);

    return {
      message: "Product deleted successfully.",
    };
  }
}

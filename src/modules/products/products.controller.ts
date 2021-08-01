import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";

import { ProductsService } from "./products.service";
import { AwsS3Service } from "../aws-s3/aws-s3.service";
import { CreateProductDto, UpdateProductDto } from "./product.dto";

@Controller("products")
@UsePipes(ValidationPipe)
export class ProductsController {
  constructor(private readonly productsService: ProductsService, private readonly s3Service: AwsS3Service) {}

  @Post()
  async getAllProducts() {
    const products = await this.productsService.getAllProducts();

    return products;
  }

  @Post("/:productId")
  async getProductById(@Param("productId") productId: string) {
    const product = await this.productsService.getProductById(productId);

    if (!product) throw new NotFoundException(`Invalid Product ID, No product found with ID: ${productId}`);

    return product;
  }

  @Put()
  @UseInterceptors(FilesInterceptor("images", 4))
  async createProduct(@Body() createProductDto: CreateProductDto, @UploadedFiles() images: Express.Multer.File[]) {
    const imageUrls = [];

    if (!images?.length) throw new BadRequestException("Minimum 1 product image is required!");

    for (const image of images) {
      const imageUrl = await this.s3Service.uploadFile(image);
      imageUrls.push(imageUrl);
    }

    createProductDto.images = imageUrls;
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

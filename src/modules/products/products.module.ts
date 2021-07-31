import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AwsS3Service } from "../aws-s3/aws-s3.service";

import { ProductModel } from "./product.model";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, AwsS3Service],
  imports: [SequelizeModule.forFeature([ProductModel])],
})
export class ProductsModule {}

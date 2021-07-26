import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { ProductModel } from "./product.model";

@Injectable()
export class ProductsService {
  constructor(@InjectModel(ProductModel) private readonly productModel: typeof ProductModel) {}
}

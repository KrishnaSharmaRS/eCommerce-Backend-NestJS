import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { UserCartItemModel } from "./user-cart-item.model";

@Injectable()
export class UserCartItemsService {
  constructor(@InjectModel(UserCartItemModel) private readonly userCartItemModel: typeof UserCartItemModel) {}
}

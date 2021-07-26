import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { UserAddressModel } from "./user-address.model";

@Injectable()
export class UserAddressesService {
  constructor(@InjectModel(UserAddressModel) private readonly userAddressModel: typeof UserAddressModel) {}
}

import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { FindAttributeOptions } from "sequelize/types";
import { CreateAddressDto, UpdateAddressDto } from "./address.dto";
import { AddressModel } from "./address.model";
import { internalServerErrorMessage } from "src/utilities/utils";

@Injectable()
export class AddressesService {
  constructor(@InjectModel(AddressModel) private readonly addressModel: typeof AddressModel) {}

  async getAllAddresses(attributes?: FindAttributeOptions) {
    const addresses = await this.addressModel.findAll({ attributes });

    return addresses;
  }

  async getAddressById(addressId: string, attributes?: FindAttributeOptions) {
    const address = await this.addressModel.findOne({ where: { id: addressId }, attributes });

    return address;
  }

  async createAddress(createAddressDto: CreateAddressDto) {
    try {
      const response = await this.addressModel.create(createAddressDto);

      return response;
    } catch (error) {
      //   if (error instanceof UniqueConstraintError) throw new ConflictException(`A address with '${error.errors[0]?.value}' already exists!`);

      throw new InternalServerErrorException(internalServerErrorMessage);
    }
  }

  async updateAddressById(addressId: string, updateAddressDto: UpdateAddressDto) {
    const response = await this.addressModel.update(updateAddressDto, { where: { id: addressId } });

    if (!response[0]) throw new NotFoundException(`Invalid Address ID: ${addressId}`);

    return response;
  }

  async deleteAddressById(addressId: string) {
    const response = await this.addressModel.destroy({ where: { id: addressId } });

    if (!response) throw new NotFoundException(`Invalid Address ID: ${addressId}`);

    return response;
  }
}

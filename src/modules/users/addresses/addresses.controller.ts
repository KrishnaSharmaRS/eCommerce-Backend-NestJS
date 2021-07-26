import { Body, Controller, Delete, NotFoundException, Param, Patch, Post, Put } from "@nestjs/common";

import { CreateAddressDto, UpdateAddressDto } from "./address.dto";
import { AddressesService } from "./addresses.service";

@Controller("addresses")
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  async getAllAddresses() {
    const addresses = await this.addressesService.getAllAddresses();

    return addresses; //.map((address) => address._attributes);
  }

  @Post("/:addressId")
  async getAddressById(@Param("addressId") addressId: string) {
    const address = await this.addressesService.getAddressById(addressId);

    if (!address) throw new NotFoundException(`Invalid Address ID, No address found with ID: ${addressId}`);

    return address;
  }

  @Put()
  async createAddress(@Body() createAddressDto: CreateAddressDto) {
    const response = await this.addressesService.createAddress(createAddressDto);

    return {
      message: "Address created successfully.",
      data: {
        id: response.id,
      },
    };
  }

  @Patch("/:addressId")
  async updateAddress(@Param("addressId") addressId: string, @Body() updateAddressDto: UpdateAddressDto) {
    await this.addressesService.updateAddressById(addressId, updateAddressDto);

    return {
      message: "Address updated successfully.",
    };
  }

  @Delete("/:addressId")
  async deleteAddress(@Param("addressId") addressId: string) {
    await this.addressesService.deleteAddressById(addressId);

    return {
      message: "Address deleted successfully.",
    };
  }
}

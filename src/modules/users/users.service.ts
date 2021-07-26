import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UniqueConstraintError } from "sequelize";
import { FindAttributeOptions } from "sequelize/types";
import { internalServerErrorMessage } from "src/utilities/utils";

import { CreateUserDto, UpdateUserDto } from "./user.dto";
import { UserModel } from "./user.model";

@Injectable()
export class UsersService {
  constructor(@InjectModel(UserModel) private readonly userModel: typeof UserModel) {}

  async getAllUsers(attributes?: FindAttributeOptions) {
    const users = await this.userModel.findAll({ attributes });

    return users;
  }

  async getUserById(userId: string, attributes?: FindAttributeOptions) {
    const user = await this.userModel.findOne({ where: { id: userId }, attributes });

    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const response = await this.userModel.create(createUserDto);

      return response;
    } catch (error) {
      if (error instanceof UniqueConstraintError) throw new ConflictException(`A user with '${error.errors[0]?.value || createUserDto.email}' (Email) already exists!`);

      throw new InternalServerErrorException(internalServerErrorMessage);
    }
  }

  async updateUserById(userId: string, updateUserDto: UpdateUserDto) {
    const response = await this.userModel.update(updateUserDto, { where: { id: userId } });

    if (!response[0]) throw new NotFoundException(`Invalid User ID: ${userId}`);

    return response;
  }

  async deleteUserById(userId: string) {
    const response = await this.userModel.destroy({ where: { id: userId } });

    if (!response) throw new NotFoundException(`Invalid User ID: ${userId}`);

    return response;
  }
}

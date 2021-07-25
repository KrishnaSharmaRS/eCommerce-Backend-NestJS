import { Body, Controller, Delete, Param, Patch, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";

import { CreateUserDto, UpdateUserDto } from "./user.dto";
import { UsersService } from "./users.service";

@Controller("users")
@UsePipes(ValidationPipe)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async getAllUsers() {
    const users = await this.usersService.getAllUsers();

    return users; //.map((user) => user._attributes);
  }

  @Post("/:userId")
  async getUserById(@Param("userId") userId: string) {
    const user = await this.usersService.getUserById(userId);

    return user;
  }

  @Put()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const response = await this.usersService.createUser(createUserDto);

    return {
      message: "User created successfully.",
      data: {
        id: response.id,
      },
    };
  }

  @Patch("/:userId")
  async updateUser(@Param("userId") userId: string, @Body() updateUserDto: UpdateUserDto) {
    await this.usersService.updateUserById(userId, updateUserDto);

    return {
      message: "User updated successfully.",
    };
  }

  @Delete("/:userId")
  async deleteUser(@Param("userId") userId: string) {
    await this.usersService.deleteUserById(userId);

    return {
      message: "User deleted successfully.",
    };
  }
}

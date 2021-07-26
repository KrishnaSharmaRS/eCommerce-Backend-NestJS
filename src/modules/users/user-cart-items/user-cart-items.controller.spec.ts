import { Test, TestingModule } from "@nestjs/testing";
import { UserCartItemsController } from "./user-cart-items.controller";

describe("UserCartItemsController", () => {
  let controller: UserCartItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCartItemsController],
    }).compile();

    controller = module.get<UserCartItemsController>(UserCartItemsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});

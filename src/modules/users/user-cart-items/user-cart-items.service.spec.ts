import { Test, TestingModule } from "@nestjs/testing";
import { UserCartItemsService } from "./user-cart-items.service";

describe("UserCartItemsService", () => {
  let service: UserCartItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCartItemsService],
    }).compile();

    service = module.get<UserCartItemsService>(UserCartItemsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});

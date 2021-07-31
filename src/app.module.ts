import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { sequelizeModuleOptions } from "./configs/sequelize.config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TrimRequestStringsMiddleware } from "./helpers/custom-middlewares";

// -------------------------------- MODULES -------------------------------------
import { UsersModule } from "./modules/users/users.module";
import { ProductsModule } from "./modules/products/products.module";
import { OrdersModule } from "./modules/orders/orders.module";
import { CouponsModule } from "./modules/coupons/coupons.module";
import { AwsS3Service } from "./modules/aws-s3/aws-s3.service";

@Module({
  imports: [SequelizeModule.forRoot(sequelizeModuleOptions), UsersModule, ProductsModule, OrdersModule, CouponsModule],
  controllers: [AppController],
  providers: [AppService, AwsS3Service],
})
export class AppModule implements NestModule {
  configure(context: MiddlewareConsumer) {
    context.apply(TrimRequestStringsMiddleware).forRoutes("/");
  }
}

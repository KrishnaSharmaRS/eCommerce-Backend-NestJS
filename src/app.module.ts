import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { sequelizeModuleOptions } from "./configs/sequelize.config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { TrimRequestStringsMiddleware } from "./helpers/custom-middlewares";

@Module({
  imports: [SequelizeModule.forRoot(sequelizeModuleOptions), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(context: MiddlewareConsumer) {
    context.apply(TrimRequestStringsMiddleware).forRoutes("/");
  }
}

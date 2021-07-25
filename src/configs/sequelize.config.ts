import { Dialect } from "sequelize/types";
import { SequelizeModuleOptions } from "@nestjs/sequelize";

import { dialect, database, username, password, host } from "./credentials.config";

export const sequelizeModuleOptions: SequelizeModuleOptions = {
  dialect: dialect as Dialect,
  database,
  username,
  password,
  host,
  port: 5432,
  benchmark: true,
  logging: process.env["NODE_ENV"] === "development",
  synchronize: true,
  autoLoadModels: true,
  sync: { alter: true },
};

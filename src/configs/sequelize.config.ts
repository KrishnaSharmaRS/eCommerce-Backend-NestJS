import { Dialect } from "sequelize/types";
import { SequelizeModuleOptions } from "@nestjs/sequelize";

import { dialect, database, username, password, host } from "./credentials.config";
import { NODE_ENV } from ".";

export const sequelizeModuleOptions: SequelizeModuleOptions = {
  dialect: dialect as Dialect,
  database,
  username,
  password,
  host,
  port: 5432,
  benchmark: true,
  logging: process.env["NODE_ENV"] !== NODE_ENV.production,
  synchronize: true,
  autoLoadModels: true,
  // sync: { alter: true },
};

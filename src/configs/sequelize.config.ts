import { Dialect } from "sequelize/types";
import { SequelizeModuleOptions } from "@nestjs/sequelize";

import { dbDialect, dbHost, dbName, dbPassword, dbPort, dbUsername } from "./credentials.config";
import { NODE_ENV } from ".";

export const sequelizeModuleOptions: SequelizeModuleOptions = {
  dialect: dbDialect as Dialect,
  database: dbName,
  username: dbUsername,
  password: dbPassword,
  host: dbHost,
  port: +dbPort,
  benchmark: true,
  logging: process.env["NODE_ENV"] !== NODE_ENV.production,
  synchronize: true,
  autoLoadModels: true,
  // sync: { alter: true },
};

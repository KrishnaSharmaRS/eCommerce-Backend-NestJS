import { NestFactory } from "@nestjs/core";
import { config } from "dotenv";

// ------------- LOAD ENVIRONMENT VARIABLES ------------
config();

import { AppModule } from "./app.module";

// ---- PORT ----
const PORT = process.env.PORT || 5000;

async function server() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    allowedHeaders: "*",
    origin: "*",
  });
  await app.listen(PORT);

  console.log(`Server is running on PORT: ${PORT}`);
}

// ---- START SERVER ----
server();

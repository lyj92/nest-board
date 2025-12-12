import { NestFactory } from "@nestjs/core";
import { Logger } from "@nestjs/common";
import { AppModule } from "./app.module";
import config from "config";

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get("server");
  const port = serverConfig.port;

  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Application running on port ${port}`);
}
bootstrap();

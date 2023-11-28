import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("v1");
  const config = new DocumentBuilder()
    .setTitle("E-commerce")
    .setDescription("The e-commerce API description")
    .setVersion("1.0")
    .addTag("shopping")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

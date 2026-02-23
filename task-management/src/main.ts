import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const SwaggerConfig = new DocumentBuilder()
    .setTitle("Task Management")
    .setDescription("Task Management application using RBAC")
    .setVersion("1.0")
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, SwaggerConfig);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

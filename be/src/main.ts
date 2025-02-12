import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // filter out properties that should not be received by the method handler
  // any property not included in the whitelist is automatically stripped from the resulting object
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, stopAtFirstError: true }),
  );

  app.enableCors({
    origin: 'http://localhost:3000', // frontend URL
    methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    allowedHeaders: 'Content-Type, Authorization', // headers are allowed for auth
    credentials: true, // Enable credentials (cookies or authorization tokens)
  });

  const config = new DocumentBuilder()
    .setTitle('Todo')
    .setDescription('Todo API description here')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const port = process.env.API_PORT;
  await app.listen(port ?? 4000);

  console.log('Server is running on port', port);
}

bootstrap();

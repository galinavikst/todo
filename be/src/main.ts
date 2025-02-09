import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.DB_PORT;
  await app.listen(port ?? 3001);

  console.log('Server is running on port', port);
}

bootstrap();

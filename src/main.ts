import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initAppTable } from './infrastructure/db/entities/PagamentoSchema';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  initAppTable();
}
bootstrap();

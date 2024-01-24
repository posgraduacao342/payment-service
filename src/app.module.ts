import { Module } from '@nestjs/common';
import { PagamentoModule } from './application/config/PagamentoModule';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoModule } from './infrastructure/db/MongoModule';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongoModule,
    PagamentoModule,
    MongooseModule.forRoot(process.env.DATA_BASE_URL),
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { PagamentoModule } from './application/config/PagamentoModule';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PagamentoModule,
    MongooseModule.forRoot('mongodb://mongodb:27017/test'),
  ],
})
export class AppModule {}

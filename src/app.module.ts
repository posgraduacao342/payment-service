import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PagamentoModule } from './application/config/PagamentoModule';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoModule } from './infrastructure/db/MongoModule';

@Module({
  imports: [
    MongoModule,
    PagamentoModule,
    MongooseModule.forRoot('mongodb://admin:password@mongodb:27017'),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

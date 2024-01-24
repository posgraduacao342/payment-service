import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

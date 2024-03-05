import { Module } from '@nestjs/common';
import { ApplicationModule } from './application/Application.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitMqModule } from './infrastructure/rabbitMQ/RabbitMQ.module';
import { MercadoPagoModule } from './infrastructure/mercadoPago/MercadoPago.module';
import { AccountApiModule } from './infrastructure/accountApi/Account.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RabbitMqModule,
    ApplicationModule,
    MercadoPagoModule,
    AccountApiModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
  ],
})
export class AppModule {}

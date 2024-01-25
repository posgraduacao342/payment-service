import { Module } from '@nestjs/common';
import { ApplicationModule } from './application/ApplicationModule';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ApplicationModule,
    MongooseModule.forRoot('mongodb://mongodb:27017/test'),
  ],
})
export class AppModule {}

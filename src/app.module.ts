import { Module } from '@nestjs/common';
import { ApplicationModule } from './application/Application.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ApplicationModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
  ],
})
export class AppModule {}

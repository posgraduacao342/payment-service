import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PagamentoModule } from './application/config/PagamentoModule';

@Module({
  imports: [PagamentoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

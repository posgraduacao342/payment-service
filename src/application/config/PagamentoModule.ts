import { Module } from '@nestjs/common';
import { PagamentoController } from '../controllers/PagamentoController';
import { ProcessarPagamentoUseCase } from 'src/domain/useCases/ProcessarPagamentoUseCase';
import { PagamentoGatewayPortKey } from 'src/domain/ports/out/PagamentoGatewayPort';
import { PagamentoGateway } from '../gateway/PagamentoGateway';
import { MetodoPagamentoFactory } from 'src/domain/factories/MetodoPagamentoFactory';
import { MercadoPagoQRCodeStrategy } from 'src/domain/strategies/MercadoPagoQRCodeStrategy';
import { DinheiroStrategy } from 'src/domain/strategies/DinheiroStrategy';
import { MercadoPagoGatewayPortKey } from 'src/domain/ports/out/MercadoPagoGatewayPort';
import { MercadoPagoGateway } from '../gateway/MercadoPagoGateway';
import { ObterPagamentosUseCase } from 'src/domain/useCases/ObterPagamentosUseCase';
import { MercadoPagoModule } from 'src/infrastructure/mercadoPago/MercadoPagoModule';
import { PagamentoRepository } from 'src/infrastructure/db/repositories/PagamentoRepository';
import { MongoModule } from 'src/infrastructure/db/MongoModule';

@Module({
  imports: [MercadoPagoModule, MongoModule],
  controllers: [PagamentoController],
  providers: [
    ProcessarPagamentoUseCase,
    MetodoPagamentoFactory,
    MercadoPagoQRCodeStrategy,
    DinheiroStrategy,
    ObterPagamentosUseCase,
    PagamentoRepository,
    {
      provide: PagamentoGatewayPortKey,
      useClass: PagamentoGateway,
    },
    {
      provide: MercadoPagoGatewayPortKey,
      useClass: MercadoPagoGateway,
    },
  ],
})
export class PagamentoModule {}

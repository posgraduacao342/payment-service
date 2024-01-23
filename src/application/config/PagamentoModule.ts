import { Module } from '@nestjs/common';
import { PagamentoController } from '../controllers/PagamentoController';
import { PagamentoRepository } from 'src/infrastructure/db/repositories/PagamentoRepository';
import { PagamentoRepositoryPortKey } from 'src/infrastructure/db/repositories/PagamentoRepositoryPort';
import { ProcessarPagamentoUseCase } from 'src/domain/useCases/ProcessarPagamentoUseCase';
import { PagamentoGatewayPortKey } from 'src/domain/ports/out/PagamentoGatewayPort';
import { PagamentoGateway } from '../gateway/PagamentoGateway';
import { MetodoPagamentoFactory } from 'src/domain/factories/MetodoPagamentoFactory';
import { MercadoPagoQRCodeStrategy } from 'src/domain/strategies/MercadoPagoQRCodeStrategy';
import { DinheiroStrategy } from 'src/domain/strategies/DinheiroStrategy';
import { MercadoPagoGatewayPortKey } from 'src/domain/ports/out/MercadoPagoGatewayPort';
import { MercadoPagoGateway } from '../gateway/MercadoPagoGateway';
import { DbClientsProvider } from 'src/infrastructure/db/config/DbClientProvider';
import { ObterPagamentosUseCase } from 'src/domain/useCases/ObterPagamentosUseCase';

@Module({
  imports: [],
  controllers: [PagamentoController],
  providers: [
    ProcessarPagamentoUseCase,
    MetodoPagamentoFactory,
    MercadoPagoQRCodeStrategy,
    DinheiroStrategy,
    DbClientsProvider,
    ObterPagamentosUseCase,
    {
      provide: PagamentoRepositoryPortKey,
      useClass: PagamentoRepository,
    },
    {
      provide: PagamentoRepositoryPortKey,
      useClass: PagamentoRepository,
    },
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

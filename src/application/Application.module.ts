import { Module } from '@nestjs/common';
import { PagamentoController } from './controllers/PagamentoController';
import { ProcessarPagamentoUseCase } from 'src/domain/useCases/ProcessarPagamentoUseCase';
import { PagamentoGatewayPortKey } from 'src/domain/ports/out/PagamentoGatewayPort';
import { PagamentoGateway } from './gateway/PagamentoGateway';
import { MetodoPagamentoFactory } from 'src/domain/factories/MetodoPagamentoFactory';
import { MercadoPagoQRCodeStrategy } from 'src/domain/strategies/MercadoPagoQRCodeStrategy';
import { DinheiroStrategy } from 'src/domain/strategies/DinheiroStrategy';
import { MercadoPagoGatewayPortKey } from 'src/domain/ports/out/MercadoPagoGatewayPort';
import { MercadoPagoGateway } from './gateway/MercadoPagoGateway';
import { ObterPagamentosUseCase } from 'src/domain/useCases/ObterPagamentosUseCase';
import { MongoModule } from 'src/infrastructure/db/Mongo.module';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './controllers/HealthController';
import { HttpModule } from '@nestjs/axios';
import { ValidarPagamentoMPUseCase } from 'src/domain/useCases/ValidarPagamentoMPUseCase';
import { ObterPagamentoPorPedidoIdUseCase } from 'src/domain/useCases/ObterPagamentoPorPedidoIdUseCase';
import { PagamentoConsumer } from './consumers/PagamentoConsumer';
import { PagamentoProducerGateway } from './gateway/PagamentoProducerGateway';
import { PagamentoProducerGatewayPortKey } from 'src/domain/ports/out/PagamentoProducerGatewayPort';
import { EmailProducerGatewayPortKey } from 'src/domain/ports/out/EmailProducerGatewayPort';
import { EmailProducerGateway } from './gateway/EmailProducerGateway';
import { AccountApiGateway } from './gateway/AccountApiGateway';
import { AccountApiGatewayPorttKey } from 'src/domain/ports/out/AccountApiGatewayPort';
import { ProcessarEstornoUseCase } from 'src/domain/useCases/ProcessarEstornoUseCase';

@Module({
  imports: [MongoModule, TerminusModule, HttpModule],
  controllers: [PagamentoController, HealthController],
  providers: [
    ProcessarPagamentoUseCase,
    MetodoPagamentoFactory,
    MercadoPagoQRCodeStrategy,
    DinheiroStrategy,
    ObterPagamentosUseCase,
    ValidarPagamentoMPUseCase,
    ObterPagamentoPorPedidoIdUseCase,
    ProcessarEstornoUseCase,
    PagamentoConsumer,
    {
      provide: PagamentoGatewayPortKey,
      useClass: PagamentoGateway,
    },
    {
      provide: MercadoPagoGatewayPortKey,
      useClass: MercadoPagoGateway,
    },
    {
      provide: PagamentoProducerGatewayPortKey,
      useClass: PagamentoProducerGateway,
    },
    {
      provide: EmailProducerGatewayPortKey,
      useClass: EmailProducerGateway,
    },
    {
      provide: AccountApiGatewayPorttKey,
      useClass: AccountApiGateway,
    },
  ],
})
export class ApplicationModule {}

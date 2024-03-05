import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { PedidoDto } from '../presenters/requests/PedidoDto';
import { ProcessarPagamentoUseCase } from 'src/domain/useCases/ProcessarPagamentoUseCase';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PagamentoConsumer {
  constructor(
    private readonly processarPagamentoUseCase: ProcessarPagamentoUseCase,
  ) {}

  @RabbitSubscribe({
    queue: 'processar_pagamento',
    exchange: 'amq.direct',
    routingKey: 'novo.pedido',
  })
  async gerarQRCode(pedido: PedidoDto): Promise<void> {
    await this.processarPagamentoUseCase.execute(pedido);
  }
}

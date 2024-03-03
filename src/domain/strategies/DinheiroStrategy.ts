import { Inject } from '@nestjs/common';
import { Pagamento } from '../entities/Pagamento';
import { Pedido } from '../entities/Pedido';
import { MetodoDePagamentoStrategyPort } from '../ports/out/MetodoDePagamentoStrategyPort';
import {
  PagamentoGatewayPort,
  PagamentoGatewayPortKey,
} from '../ports/out/PagamentoGatewayPort';
import { StatusPagamento } from '../enums';
import {
  PagamentoProducerGatewayPort,
  PagamentoProducerGatewayPortKey,
} from '../ports/out/PagamentoProducerGatewayPort';

export class DinheiroStrategy implements MetodoDePagamentoStrategyPort {
  constructor(
    @Inject(PagamentoGatewayPortKey)
    private readonly pagamentoGatewayPort: PagamentoGatewayPort,
    @Inject(PagamentoProducerGatewayPortKey)
    private readonly pagamentoProducerGateway: PagamentoProducerGatewayPort,
  ) {}

  public async processarPagamento(
    pedido: Pedido,
    pagamento: Pagamento,
  ): Promise<Pagamento> {
    pagamento.atualizarStatusPagamento(StatusPagamento.PAGO);

    const novoPagamento = await this.pagamentoGatewayPort.atualizarPagamento(
      pagamento,
    );
    await this.pagamentoProducerGateway.publicarPagamentoAprovado(pedido.id);
    return novoPagamento;
  }
}

import { Inject } from '@nestjs/common';
import { Pagamento } from '../entities/Pagamento';
import { Pedido } from '../entities/Pedido';
import { MetodoDePagamentoStrategyPort } from '../ports/out/MetodoDePagamentoStrategyPort';
import {
  PagamentoGatewayPort,
  PagamentoGatewayPortKey,
} from '../ports/out/PagamentoGatewayPort';
import { StatusPagamento } from '../enums';

export class DinheiroStrategy implements MetodoDePagamentoStrategyPort {
  constructor(
    @Inject(PagamentoGatewayPortKey)
    private readonly pagamentoGatewayPort: PagamentoGatewayPort,
  ) {}

  public async processarPagamento(
    _pedido: Pedido,
    pagamento: Pagamento,
  ): Promise<Pagamento> {
    pagamento.atualizarStatusPagamento(StatusPagamento.PAGO);

    await this.pagamentoGatewayPort.atualizarStatusPagamento(pagamento);

    return pagamento;
  }
}

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
import {
  EmailProducerGatewayPort,
  EmailProducerGatewayPortKey,
} from '../ports/out/EmailProducerGatewayPort';

export class DinheiroStrategy implements MetodoDePagamentoStrategyPort {
  constructor(
    @Inject(PagamentoGatewayPortKey)
    private readonly pagamentoGatewayPort: PagamentoGatewayPort,
    @Inject(PagamentoProducerGatewayPortKey)
    private readonly pagamentoProducerGateway: PagamentoProducerGatewayPort,
    @Inject(EmailProducerGatewayPortKey)
    private readonly emailProducerGatewayPort: EmailProducerGatewayPort,
  ) {}

  public async processarPagamento(
    pedido: Pedido,
    pagamento: Pagamento,
  ): Promise<Pagamento> {
    pagamento.atualizarStatusPagamento(StatusPagamento.PAGO);
    await this.pagamentoGatewayPort.atualizarPagamento(pagamento);
    await Promise.all([
      this.pagamentoProducerGateway.publicarPagamentoAprovado(pedido.id),
      this.emailProducerGatewayPort.publicarEmailPagamentoComSucesso(
        pedido.preco,
        pedido.email,
      ),
    ]);
    return pagamento;
  }
}

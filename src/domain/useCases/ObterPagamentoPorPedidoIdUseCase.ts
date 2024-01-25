import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Pagamento } from '../entities/Pagamento';
import {
  PagamentoGatewayPort,
  PagamentoGatewayPortKey,
} from '../ports/out/PagamentoGatewayPort';

@Injectable()
export class ObterPagamentoPorPedidoIdUseCase {
  constructor(
    @Inject(PagamentoGatewayPortKey)
    private readonly pagamentoGateway: PagamentoGatewayPort,
  ) {}

  async execute(pedidoId: string): Promise<Pagamento> {
    const pagamento = await this.pagamentoGateway.obterPagamentoPorIdDoPedido(
      pedidoId,
    );

    if (!pagamento) {
      throw new NotFoundException('Pagamento não foi encontrado');
    }

    return pagamento;
  }
}

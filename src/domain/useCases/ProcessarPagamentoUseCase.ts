import { Inject, Injectable } from '@nestjs/common';
import { Pagamento } from '../entities/Pagamento';
import { MetodoPagamentoFactory } from '../factories/MetodoPagamentoFactory';
import {
  PagamentoGatewayPort,
  PagamentoGatewayPortKey,
} from '../ports/out/PagamentoGatewayPort';
import { Pedido } from '../entities/Pedido';
import { StatusPagamento } from '../enums';

@Injectable()
export class ProcessarPagamentoUseCase {
  constructor(
    @Inject(PagamentoGatewayPortKey)
    private readonly pagamentoGateway: PagamentoGatewayPort,
    private readonly metodoPagamentoFactory: MetodoPagamentoFactory,
  ) {}

  async execute(pedido: Pedido): Promise<Pagamento> {
    const pagamento = await this.pagamentoGateway.obterPagamentoPorIdDoPedido(
      pedido.id,
    );
    if (pagamento) {
      throw new Error('Pagamento já foi efetuado');
    }

    const novoPagamento = Pagamento.criarNovoPagamento(
      pedido,
      StatusPagamento.EM_PROGRESSO,
    );

    const novoPagamentoCriado = await this.pagamentoGateway.criarPagamento(
      novoPagamento,
    );

    const strategy = this.metodoPagamentoFactory.obterEstrategia(
      pedido.metodoPagamento,
    );

    return await strategy.processarPagamento(pedido, novoPagamentoCriado);
  }
}

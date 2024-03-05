import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Pagamento } from '../entities/Pagamento';
import { MetodoPagamentoFactory } from '../factories/MetodoPagamentoFactory';
import {
  PagamentoGatewayPort,
  PagamentoGatewayPortKey,
} from '../ports/out/PagamentoGatewayPort';
import { Pedido } from '../entities/Pedido';
import { StatusPagamento } from '../enums';
import {
  AccountApiGatewayPort,
  AccountApiGatewayPorttKey,
} from '../ports/out/AccountApiGatewayPort';

@Injectable()
export class ProcessarPagamentoUseCase {
  constructor(
    @Inject(PagamentoGatewayPortKey)
    private readonly pagamentoGateway: PagamentoGatewayPort,
    @Inject(AccountApiGatewayPorttKey)
    private readonly accountApiGateway: AccountApiGatewayPort,
    private readonly metodoPagamentoFactory: MetodoPagamentoFactory,
  ) {}

  async execute(pedido: Pedido): Promise<Pagamento> {
    const pagamento =
      await this.pagamentoGateway.obterPagamentoPorIdDoPedidoEStatus(
        pedido.id,
        [StatusPagamento.PAGO, StatusPagamento.EM_PROGRESSO],
      );

    if (pagamento) {
      throw new ConflictException('Pagamento já foi efetuado');
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

    let email = undefined;
    if (pedido.clienteId) {
      email = await this.accountApiGateway.buscarEmailUsuario(pedido.clienteId);
    }

    return await strategy.processarPagamento(
      pedido,
      novoPagamentoCriado,
      email,
    );
  }
}

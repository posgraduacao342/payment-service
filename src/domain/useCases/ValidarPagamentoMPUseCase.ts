import { Inject, Injectable } from '@nestjs/common';
import {
  MercadoPagoGatewayPort,
  MercadoPagoGatewayPortKey,
} from '../ports/out/MercadoPagoGatewayPort';
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
import {
  AccountApiGatewayPort,
  AccountApiGatewayPorttKey,
} from '../ports/out/AccountApiGatewayPort';

@Injectable()
export class ValidarPagamentoMPUseCase {
  constructor(
    @Inject(MercadoPagoGatewayPortKey)
    private readonly mercadoPagoGateway: MercadoPagoGatewayPort,
    @Inject(PagamentoGatewayPortKey)
    private readonly pagamentoGateway: PagamentoGatewayPort,
    @Inject(PagamentoProducerGatewayPortKey)
    private readonly pagamentoProducerGateway: PagamentoProducerGatewayPort,
    @Inject(EmailProducerGatewayPortKey)
    private readonly emailProducerGatewayPort: EmailProducerGatewayPort,
    @Inject(AccountApiGatewayPorttKey)
    private readonly accountApiGateway: AccountApiGatewayPort,
  ) {}

  async execute(pagamentoId: string): Promise<void> {
    const { status, pedidoId } =
      await this.mercadoPagoGateway.pagamentoFoiRealizadoComSucesso(
        pagamentoId,
      );

    const pagamento = await this.pagamentoGateway.obterPagamentoPorIdDoPedido(
      pedidoId,
    );

    if (!pagamento) {
      console.log('Pagamento não foi encontrado');
      return;
    }

    let email = undefined;
    if (pagamento.clienteId) {
      email = await this.accountApiGateway.buscarEmailUsuario(
        pagamento.clienteId,
      );
    }

    if (status) {
      pagamento.atualizarStatusPagamento(StatusPagamento.PAGO);

      await this.pagamentoGateway.atualizarPagamento(pagamento);
      await Promise.all([
        this.pagamentoProducerGateway.publicarPagamentoAprovado(
          pedidoId,
          pagamento.clienteId,
        ),
        this.emailProducerGatewayPort.publicarEmailPagamentoComSucesso(email),
      ]);
      return;
    }

    await this.pagamentoGateway.atualizarStatusPorPedidoId(
      pedidoId,
      StatusPagamento.FRACASSADO,
    );
    await Promise.all([
      this.pagamentoProducerGateway.publicarPagamentoRejeitado(
        pedidoId,
        pagamento.clienteId,
      ),
      this.emailProducerGatewayPort.publicarEmailPagamentoRejeitado(email),
    ]);
  }
}

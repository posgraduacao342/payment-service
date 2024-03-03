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

@Injectable()
export class ValidarPagamentoMPUseCase {
  constructor(
    @Inject(MercadoPagoGatewayPortKey)
    private readonly mercadoPagoGateway: MercadoPagoGatewayPort,
    @Inject(PagamentoGatewayPortKey)
    private readonly pagamentoGateway: PagamentoGatewayPort,
    @Inject(PagamentoProducerGatewayPortKey)
    private readonly pagamentoProducerGateway: PagamentoProducerGatewayPort,
  ) {}

  async execute(pagamentoId: string): Promise<void> {
    const { status, pedidoId } =
      await this.mercadoPagoGateway.pagamentoFoiRealizadoComSucesso(
        pagamentoId,
      );

    if (status) {
      await this.pagamentoGateway.atualizarStatusPorPedidoId(
        pedidoId,
        StatusPagamento.PAGO,
      );
      await this.pagamentoProducerGateway.publicarPagamentoAprovado(pedidoId);
      return;
    }

    await this.pagamentoGateway.atualizarStatusPorPedidoId(
      pedidoId,
      StatusPagamento.FRACASSADO,
    );
    await this.pagamentoProducerGateway.publicarPagamentoRejeitado(pedidoId);
  }
}

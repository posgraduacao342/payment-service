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

@Injectable()
export class ValidarPagamentoMPUseCase {
  constructor(
    @Inject(MercadoPagoGatewayPortKey)
    private readonly mercadoPagoGateway: MercadoPagoGatewayPort,
    @Inject(PagamentoGatewayPortKey)
    private readonly pagamentoGateway: PagamentoGatewayPort,
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
      return;
    }

    await this.pagamentoGateway.atualizarStatusPorPedidoId(
      pedidoId,
      StatusPagamento.FRACASSADO,
    );
  }
}

import { Inject } from '@nestjs/common';
import { Pagamento } from '../entities/Pagamento';
import { Pedido } from '../entities/Pedido';
import { StatusPagamento } from '../enums';
import { MetodoDePagamentoStrategyPort } from '../ports/out/MetodoDePagamentoStrategyPort';
import {
  PagamentoGatewayPort,
  PagamentoGatewayPortKey,
} from '../ports/out/PagamentoGatewayPort';
import {
  MercadoPagoGatewayPort,
  MercadoPagoGatewayPortKey,
} from '../ports/out/MercadoPagoGatewayPort';

export class MercadoPagoQRCodeStrategy
  implements MetodoDePagamentoStrategyPort
{
  constructor(
    @Inject(PagamentoGatewayPortKey)
    private readonly pagamentoGateway: PagamentoGatewayPort,
    @Inject(MercadoPagoGatewayPortKey)
    private readonly mercadoPagoGateway: MercadoPagoGatewayPort,
  ) {}

  public async processarPagamento(
    pedido: Pedido,
    pagamento: Pagamento,
  ): Promise<Pagamento> {
    pagamento.atualizarStatusPagamento(StatusPagamento.EM_PROGRESSO);

    const qrCode = await this.mercadoPagoGateway.gerarQrcode(pedido);
    pagamento.qrCode = qrCode;

    await this.pagamentoGateway.atualizarPagamento(pagamento);

    return pagamento;
  }
}

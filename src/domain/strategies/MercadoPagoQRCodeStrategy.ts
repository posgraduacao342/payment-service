import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
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
import {
  PagamentoProducerGatewayPort,
  PagamentoProducerGatewayPortKey,
} from '../ports/out/PagamentoProducerGatewayPort';
import {
  EmailProducerGatewayPort,
  EmailProducerGatewayPortKey,
} from '../ports/out/EmailProducerGatewayPort';

export class MercadoPagoQRCodeStrategy
  implements MetodoDePagamentoStrategyPort
{
  constructor(
    @Inject(PagamentoGatewayPortKey)
    private readonly pagamentoGateway: PagamentoGatewayPort,
    @Inject(MercadoPagoGatewayPortKey)
    private readonly mercadoPagoGateway: MercadoPagoGatewayPort,
    @Inject(PagamentoProducerGatewayPortKey)
    private readonly pagamentoProducerGateway: PagamentoProducerGatewayPort,
    @Inject(EmailProducerGatewayPortKey)
    private readonly emailProducerGatewayPort: EmailProducerGatewayPort,
  ) {}

  public async processarPagamento(
    pedido: Pedido,
    pagamento: Pagamento,
    email?: string,
  ): Promise<Pagamento> {
    try {
      pagamento.atualizarStatusPagamento(StatusPagamento.EM_PROGRESSO);
      pagamento.qrCode = await this.mercadoPagoGateway.gerarQrcode(pedido);

      await this.pagamentoGateway.atualizarPagamento(pagamento);
      await this.emailProducerGatewayPort.publicarEmailAguardandoPagamento(
        pedido.preco,
        email,
      );
      return pagamento;
    } catch (error) {
      await this.pagamentoGateway.deletarPagamentoPorId(pagamento.id);
      await Promise.all([
        this.pagamentoProducerGateway.publicarPagamentoRejeitado(pedido.id),
        this.emailProducerGatewayPort.publicarEmailPagamentoRejeitado(email),
      ]);
      Logger.error(error);

      throw new InternalServerErrorException(
        'Erro ao gerar o QRCode do Mercado Pago',
      );
    }
  }
}

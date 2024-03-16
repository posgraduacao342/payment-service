import { Inject, NotFoundException } from '@nestjs/common';
import { Pedido } from 'src/domain/entities/Pedido';
import { MercadoPagoGatewayPort } from 'src/domain/ports/out/MercadoPagoGatewayPort';
import { ItemMP } from 'src/infrastructure/mercadoPago/entities/ItemMp';
import { PedidoMP } from 'src/infrastructure/mercadoPago/entities/PedidoMp';
import {
  MercadoPagoPort,
  MercadoPagoPortKey,
} from 'src/infrastructure/mercadoPago/port/MercadoPagoPort';

export class MercadoPagoGateway implements MercadoPagoGatewayPort {
  constructor(
    @Inject(MercadoPagoPortKey)
    private readonly mercadoPago: MercadoPagoPort,
  ) {}

  async pagamentoFoiRealizadoComSucesso(
    pagamentoId: string,
  ): Promise<{ status: boolean; pedidoId: string }> {
    try {
      const infoPagamento = await this.mercadoPago.buscarInfoPagamento(
        pagamentoId,
      );
  
      return {
        status: infoPagamento.status === 'approved',
        pedidoId: infoPagamento.external_reference,
      };
    } catch (error) {
      throw new NotFoundException(`Pagamento com o id ${pagamentoId} não foi encontrado no MP`)
    }
  }

  async gerarQrcode(pedido: Pedido): Promise<string> {
    const diasDeExpiracao = 1;
    const webHookUrl = process.env.WEBHOOK_MP_URL;
    const pedidoMP = new PedidoMP(
      pedido.id,
      pedido.preco,
      webHookUrl,
      diasDeExpiracao,
    );

    pedido.itens.forEach((item) => {
      const produto = item.produto;
      const itemMP = new ItemMP(
        produto.id,
        produto.nome,
        item.quantidade,
        produto.preco,
        item.quantidade * produto.preco,
      );
      pedidoMP.adicionarItem(itemMP);
    });

    return await this.mercadoPago.gerarQrcode(pedidoMP);
  }
}

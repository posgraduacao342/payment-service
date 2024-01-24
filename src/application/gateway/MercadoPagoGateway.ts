import { Inject } from '@nestjs/common';
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

  async gerarQrcode(pedido: Pedido): Promise<string> {
    const diasDeExpiracao = 1;
    const pedidoMP = new PedidoMP(
      pedido.id,
      pedido.preco,
      'https://www.google.com.br',
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

import { Item } from 'src/domain/entities/Item';
import { Pedido } from 'src/domain/entities/Pedido';
import { Produto } from 'src/domain/entities/Produto';
import { MetodoPagamento } from 'src/domain/enums';

export class PedidoHelper {
  public static gerarPedido(
    id: string | undefined = undefined,
    preco: number | undefined = undefined,
    metodoPagamento: MetodoPagamento | undefined = undefined,
  ): Pedido {
    const pedido = new Pedido();
    pedido.id = id ?? PedidoHelper.buscarIdPadrao();
    pedido.metodoPagamento =
      metodoPagamento ?? PedidoHelper.buscarMetodoPagamentoPadrao();
    pedido.preco = preco ?? PedidoHelper.buscarPreco();
    pedido.itens = PedidoHelper.buscarItensPadrao();

    return pedido;
  }

  private static buscarIdPadrao(): string {
    return 'cc2f2531-76ac-4dce-a7ad-4beeacb46d50';
  }

  private static buscarMetodoPagamentoPadrao(): MetodoPagamento {
    return MetodoPagamento.DINHEIRO;
  }

  private static buscarPreco(): number {
    return 20;
  }

  private static buscarItensPadrao(): Item[] {
    const itens: Item[] = [];

    const item = new Item();
    const produto = new Produto();

    produto.id = 'produtoId';
    produto.nome = 'produtoNome';
    produto.preco = 10;

    item.produto = produto;
    item.id = 'itemId';
    item.quantidade = 1;

    itens.push(item);

    return itens;
  }
}

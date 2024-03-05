import { Pagamento } from 'src/domain/entities/Pagamento';
import { StatusPagamento } from 'src/domain/enums';

export const PagamentoGatewayPortKey = 'IPagamentoGatewayPort';

export interface PagamentoGatewayPort {
  criarPagamento(pagamento: Pagamento): Promise<Pagamento>;
  atualizarPagamento(pagamento: Pagamento): Promise<Pagamento>;
  atualizarStatusPorPedidoId(
    pedidoId: string,
    statusPagamento: StatusPagamento,
  ): Promise<void>;
  obterPagamentoPorIdDoPedidoEStatus(
    pedidoId: string,
    statusPagamentos: StatusPagamento[],
  ): Promise<Pagamento | null>;
  obterPagamentoPorIdDoPedido(pedidoId: string): Promise<Pagamento | null>;
  obterPagamentos(): Promise<Pagamento[]>;
  deletarPagamentoPorId(id: string): Promise<void>;
}

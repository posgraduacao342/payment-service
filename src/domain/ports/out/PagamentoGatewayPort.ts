import { Pagamento } from 'src/domain/entities/Pagamento';

export const PagamentoGatewayPortKey = 'IPagamentoGatewayPort';

export interface PagamentoGatewayPort {
  criarPagamento(pagamento: Pagamento): Promise<Pagamento>;
  atualizarStatusPagamento(pagamento: Pagamento): Promise<Pagamento>;
  obterPagamentoPorIdDoPedido(pedidoId: string): Promise<Pagamento | null>;
  obterPagamentos(): Promise<Pagamento[]>;
}

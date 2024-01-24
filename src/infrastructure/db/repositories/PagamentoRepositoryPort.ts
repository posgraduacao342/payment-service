import { Pagamento } from 'src/domain/entities/Pagamento';

export const PagamentoRepositoryPortKey = 'IPagamentoRepositoryPort';

export interface PagamentoRepositoryPort {
  criarPagamento(pagamento: Pagamento): Promise<Pagamento>;
  atualizarStatusPagamento(pagamento: Pagamento): Promise<Pagamento>;
  atualizarStatusPagamentoEQRCode(pagamento: Pagamento): Promise<Pagamento>;
  obterPagamentoPorIdDoPedido(pedidoId: string): Promise<Pagamento | null>;
  obterPagamentos(): Promise<Pagamento[]>;
}

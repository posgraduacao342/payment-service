import { PagamentoEntity } from '../entities/PagamentoEntity';

export const PagamentoRepositoryPortKey = 'IPagamentoRepositoryPort';

export interface PagamentoRepositoryPort {
  criarPagamento(pagamento: PagamentoEntity): Promise<PagamentoEntity>;
  atualizarPagamento(pagamento: PagamentoEntity): Promise<PagamentoEntity>;
  obterPagamentoPorIdDoPedido(
    pedidoId: string,
  ): Promise<PagamentoEntity | null>;
  obterPagamentos(): Promise<PagamentoEntity[]>;
}

import { StatusPagamento } from 'src/domain/enums';
import { PagamentoEntity } from '../entities/PagamentoEntity';

export const PagamentoRepositoryPortKey = 'IPagamentoRepositoryPort';

export interface PagamentoRepositoryPort {
  criarPagamento(pagamento: PagamentoEntity): Promise<PagamentoEntity>;
  atualizarPagamento(pagamento: PagamentoEntity): Promise<PagamentoEntity>;
  obterPagamentoPorIdDoPedido(
    pedidoId: string,
  ): Promise<PagamentoEntity | null>;
  obterPagamentoPorIdDoPedidoEStatus(
    pedidoId: string,
    statusPagamentos: StatusPagamento[],
  ): Promise<PagamentoEntity | null>;
  deletarPagamentoPorId(id: string): Promise<void>;
  obterPagamentos(): Promise<PagamentoEntity[]>;
  atualizarStatusPorPedidoId(
    pedidoId: string,
    statusPagamento: StatusPagamento,
  ): Promise<void>;
}

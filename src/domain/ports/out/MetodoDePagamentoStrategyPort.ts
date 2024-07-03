import { Pagamento } from 'src/domain/entities/Pagamento';
import { Pedido } from 'src/domain/entities/Pedido';

export const MetodoDePagamentoStrategyPortKey =
  'IMetodoDePagamentoStrategyPort';

export interface MetodoDePagamentoStrategyPort {
  processarPagamento(
    pedido: Pedido,
    pagamento: Pagamento,
    email?: string,
  ): Promise<Pagamento>;
}

export const PagamentoProducerGatewayPortKey = 'IPagamentoProducerGatewayPort';

export interface PagamentoProducerGatewayPort {
  publicarPagamentoRejeitado(pedidoId: string): Promise<void>;
  publicarPagamentoAprovado(pedidoId: string): Promise<void>;
}

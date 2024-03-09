export const PagamentoProducerGatewayPortKey = 'IPagamentoProducerGatewayPort';

export interface PagamentoProducerGatewayPort {
  publicarPagamentoRejeitado(
    pedidoId: string,
    clienteId?: string,
  ): Promise<void>;
  publicarPagamentoAprovado(
    pedidoId: string,
    clienteId?: string,
  ): Promise<void>;

  publicarPagamentoEstornado(
    pedidoId: string,
    clienteId?: string,
  ): Promise<void>;
}

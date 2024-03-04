export const EmailProducerGatewayPortKey = 'IEmailProducerGatewayPort';

export interface EmailProducerGatewayPort {
  publicarEmailPagamentoComSucesso(
    total: number,
    email?: string,
  ): Promise<void>;
  publicarEmailPagamentoRejeitado(total: number, email?: string): Promise<void>;
}

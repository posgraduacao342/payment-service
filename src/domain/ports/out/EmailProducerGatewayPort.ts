export const EmailProducerGatewayPortKey = 'IEmailProducerGatewayPort';

export interface EmailProducerGatewayPort {
  publicarEmailPagamentoComSucesso(email?: string): Promise<void>;
  publicarEmailPagamentoRejeitado(email?: string): Promise<void>;
  publicarEmailPagamentoEstornado(email?: string): Promise<void>;
  publicarEmailAguardandoPagamento(
    total: number,
    email?: string,
  ): Promise<void>;
}

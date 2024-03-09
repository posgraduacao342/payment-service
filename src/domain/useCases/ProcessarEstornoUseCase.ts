import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  PagamentoGatewayPort,
  PagamentoGatewayPortKey,
} from '../ports/out/PagamentoGatewayPort';
import { StatusPagamento } from '../enums';
import {
  EmailProducerGatewayPort,
  EmailProducerGatewayPortKey,
} from '../ports/out/EmailProducerGatewayPort';
import {
  AccountApiGatewayPort,
  AccountApiGatewayPorttKey,
} from '../ports/out/AccountApiGatewayPort';
import {
  PagamentoProducerGatewayPort,
  PagamentoProducerGatewayPortKey,
} from '../ports/out/PagamentoProducerGatewayPort';

@Injectable()
export class ProcessarEstornoUseCase {
  constructor(
    @Inject(PagamentoGatewayPortKey)
    private readonly pagamentoGateway: PagamentoGatewayPort,
    @Inject(EmailProducerGatewayPortKey)
    private readonly emailProducerGatewayPort: EmailProducerGatewayPort,
    @Inject(AccountApiGatewayPorttKey)
    private readonly accountApiGateway: AccountApiGatewayPort,
    @Inject(PagamentoProducerGatewayPortKey)
    private readonly pagamentoProducerGateway: PagamentoProducerGatewayPort,
  ) {}

  async execute(pedidoId: string, clienteId?: string): Promise<void> {
    const pagamento = await this.pagamentoGateway.obterPagamentoPorIdDoPedido(
      pedidoId,
    );

    if (!pagamento) {
      throw new NotFoundException('Pagamento não foi encontrado');
    }

    if (pagamento.statusPagamento !== StatusPagamento.PAGO) {
      throw new ConflictException(
        'O pagamento não foi realizado para ser estornado',
      );
    }

    pagamento.statusPagamento = StatusPagamento.PAGO;
    await this.pagamentoGateway.atualizarPagamento(pagamento);

    let email = undefined;
    if (clienteId) {
      email = await this.accountApiGateway.buscarEmailUsuario(clienteId);
    }

    await Promise.all([
      this.emailProducerGatewayPort.publicarEmailPagamentoEstornado(email),
      this.pagamentoProducerGateway.publicarPagamentoEstornado(
        pedidoId,
        clienteId,
      ),
    ]);
  }
}

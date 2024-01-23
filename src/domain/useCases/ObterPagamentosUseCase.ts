import { Inject, Injectable } from '@nestjs/common';
import { Pagamento } from '../entities/Pagamento';
import {
  PagamentoGatewayPort,
  PagamentoGatewayPortKey,
} from '../ports/out/PagamentoGatewayPort';

@Injectable()
export class ObterPagamentosUseCase {
  constructor(
    @Inject(PagamentoGatewayPortKey)
    private readonly pagamentoGateway: PagamentoGatewayPort,
  ) {}

  async execute(): Promise<Pagamento[]> {
    return await this.pagamentoGateway.obterPagamentos();
  }
}

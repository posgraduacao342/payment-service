import { Inject, Injectable } from '@nestjs/common';
import { Pagamento } from 'src/domain/entities/Pagamento';
import { PagamentoGatewayPort } from 'src/domain/ports/out/PagamentoGatewayPort';
import {
  PagamentoRepositoryPort,
  PagamentoRepositoryPortKey,
} from 'src/infrastructure/db/repositories/PagamentoRepositoryPort';

@Injectable()
export class PagamentoGateway implements PagamentoGatewayPort {
  constructor(
    @Inject(PagamentoRepositoryPortKey)
    private readonly pagamentoRepository: PagamentoRepositoryPort,
  ) {}

  async obterPagamentos(): Promise<Pagamento[]> {
    return await this.pagamentoRepository.obterPagamentos();
  }

  async criarPagamento(pagamento: Pagamento): Promise<Pagamento> {
    return await this.pagamentoRepository.criarPagamento(pagamento);
  }

  async atualizarStatusPagamento(pagamento: Pagamento): Promise<Pagamento> {
    return await this.pagamentoRepository.atualizarStatusPagamento(pagamento);
  }

  async obterPagamentoPorIdDoPedido(pedidoId: string): Promise<Pagamento> {
    return await this.pagamentoRepository.obterPagamentoPorIdDoPedido(pedidoId);
  }
}

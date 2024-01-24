import { Inject, Injectable } from '@nestjs/common';
import { Pagamento } from 'src/domain/entities/Pagamento';
import { PagamentoGatewayPort } from 'src/domain/ports/out/PagamentoGatewayPort';
import {
  PagamentoRepositoryPort,
  PagamentoRepositoryPortKey,
} from 'src/infrastructure/db/repositories/PagamentoRepositoryPort';
import { PagamentoMapper } from './mappers/PagamentoMapper';

@Injectable()
export class PagamentoGateway implements PagamentoGatewayPort {
  constructor(
    @Inject(PagamentoRepositoryPortKey)
    private readonly pagamentoRepository: PagamentoRepositoryPort,
  ) {}

  async obterPagamentos(): Promise<Pagamento[]> {
    throw new Error('Method not implemented.');
  }

  async criarPagamento(pagamento: Pagamento): Promise<Pagamento> {
    const pagamentoEntity = PagamentoMapper.toEntity(pagamento);
    const result = await this.pagamentoRepository.criarPagamento(
      pagamentoEntity,
    );

    return PagamentoMapper.toDomin(result);
  }

  async atualizarPagamento(pagamento: Pagamento): Promise<Pagamento> {
    const pagamentoEntity = PagamentoMapper.toEntity(pagamento);
    const result = await this.pagamentoRepository.atualizarPagamento(
      pagamentoEntity,
    );

    return PagamentoMapper.toDomin(result);
  }

  async atualizarStatusPagamentoEQRCode(
    pagamento: Pagamento,
  ): Promise<Pagamento> {
    throw new Error('Method not implemented.');
  }

  async obterPagamentoPorIdDoPedido(
    pedidoId: string,
  ): Promise<Pagamento | null> {
    const result = await this.pagamentoRepository.obterPagamentoPorIdDoPedido(
      pedidoId,
    );

    return result ? PagamentoMapper.toDomin(result) : null;
  }
}

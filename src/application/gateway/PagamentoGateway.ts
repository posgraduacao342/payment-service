import { Inject, Injectable } from '@nestjs/common';
import { Pagamento } from 'src/domain/entities/Pagamento';
import { PagamentoGatewayPort } from 'src/domain/ports/out/PagamentoGatewayPort';
import {
  PagamentoRepositoryPort,
  PagamentoRepositoryPortKey,
} from 'src/infrastructure/db/repositories/PagamentoRepositoryPort';
import { PagamentoMapper } from './mappers/PagamentoMapper';
import { StatusPagamento } from 'src/domain/enums';

@Injectable()
export class PagamentoGateway implements PagamentoGatewayPort {
  constructor(
    @Inject(PagamentoRepositoryPortKey)
    private readonly pagamentoRepository: PagamentoRepositoryPort,
  ) {}

  async atualizarStatusPorPedidoId(
    pedidoId: string,
    statusPagamento: StatusPagamento,
  ): Promise<void> {
    await this.pagamentoRepository.atualizarStatusPorPedidoId(
      pedidoId,
      statusPagamento,
    );
  }

  async deletarPagamentoPorId(id: string): Promise<void> {
    await this.pagamentoRepository.deletarPagamentoPorId(id);
  }

  async obterPagamentos(): Promise<Pagamento[]> {
    const pagamentoEntities = await this.pagamentoRepository.obterPagamentos();
    return pagamentoEntities.map((pagamentoEntity) =>
      PagamentoMapper.toDomin(pagamentoEntity),
    );
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

  async obterPagamentoPorIdDoPedido(
    pedidoId: string,
  ): Promise<Pagamento | null> {
    const result = await this.pagamentoRepository.obterPagamentoPorIdDoPedido(
      pedidoId,
    );

    return result ? PagamentoMapper.toDomin(result) : null;
  }
}

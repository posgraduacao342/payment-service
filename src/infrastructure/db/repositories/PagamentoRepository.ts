import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  PagamentoEntity,
  PagamentoEntityDocument,
} from '../entities/PagamentoEntity';
import { InjectModel } from '@nestjs/mongoose';
import { PagamentoRepositoryPort } from './PagamentoRepositoryPort';
import { StatusPagamento } from 'src/domain/enums';

@Injectable()
export class PagamentoRepository implements PagamentoRepositoryPort {
  constructor(
    @InjectModel(PagamentoEntity.name)
    private readonly pagamento: Model<PagamentoEntityDocument>,
  ) {}

  async atualizarStatusPorPedidoId(
    pedidoId: string,
    statusPagamento: StatusPagamento,
  ): Promise<void> {
    await this.pagamento.updateOne<PagamentoEntity>(
      { pedidoId },
      { statusPagamento },
    );
  }

  async deletarPagamentoPorId(id: string): Promise<void> {
    await this.pagamento.deleteOne({ _id: id });
  }

  async criarPagamento(pagamento: PagamentoEntity): Promise<PagamentoEntity> {
    return await this.pagamento.create<PagamentoEntity>(pagamento);
  }

  async obterPagamentoPorIdDoPedido(
    pedidoId: string,
  ): Promise<PagamentoEntity | null> {
    return await this.pagamento.findOne<PagamentoEntity>({
      pedidoId,
    });
  }

  async obterPagamentoPorIdDoPedidoEStatus(
    pedidoId: string,
    statusPagamentos: StatusPagamento[],
  ): Promise<PagamentoEntity | null> {
    return await this.pagamento.findOne<PagamentoEntity>({
      pedidoId,
      statusPagamento: { $in: statusPagamentos },
    });
  }

  async atualizarPagamento(
    pagamento: PagamentoEntity,
  ): Promise<PagamentoEntity> {
    return await this.pagamento.findByIdAndUpdate<PagamentoEntity>(
      pagamento._id,
      pagamento,
    );
  }

  async obterPagamentos(): Promise<PagamentoEntity[]> {
    return await this.pagamento.find<PagamentoEntity>();
  }
}

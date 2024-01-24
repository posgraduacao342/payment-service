import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  PagamentoEntity,
  PagamentoEntityDocument,
} from '../entities/PagamentoEntity';
import { InjectModel } from '@nestjs/mongoose';
import { PagamentoRepositoryPort } from './PagamentoRepositoryPort';

@Injectable()
export class PagamentoRepository implements PagamentoRepositoryPort {
  constructor(
    @InjectModel(PagamentoEntity.name)
    private readonly pagamento: Model<PagamentoEntityDocument>,
  ) {}

  async criarPagamento(pagamento: PagamentoEntity): Promise<PagamentoEntity> {
    return await this.pagamento.create<PagamentoEntity>(pagamento);
  }

  async obterPagamentoPorIdDoPedido(
    pedidoId: string,
  ): Promise<PagamentoEntity | null> {
    return await this.pagamento.findOne<PagamentoEntity>({ pedidoId });
  }

  async atualizarPagamento(
    pagamento: PagamentoEntity,
  ): Promise<PagamentoEntity> {
    return await this.pagamento.findByIdAndUpdate<PagamentoEntity>(
      pagamento._id,
      pagamento,
    );
  }

  obterPagamentos(): Promise<PagamentoEntity[]> {
    throw new Error('Method not implemented.');
  }
}

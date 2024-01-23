import { randomUUID } from 'crypto';
import { MetodoPagamento, StatusPagamento } from '../enums';
import { Pedido } from './Pedido';

export class Pagamento {
  id: string;
  pedidoId: string;
  statusPagamento: StatusPagamento;
  valorPagamento: number;
  metodoPagamento: MetodoPagamento;
  dataCriacao: Date;
  dataAtualizacao: Date;
  dataDelecao?: Date;
  qrCode?: string;

  atualizarStatusPagamento(statusPagamento: StatusPagamento) {
    this.statusPagamento = statusPagamento;
  }

  public static criarNovoPagamento(
    pedido: Pedido,
    statusPagamento: StatusPagamento,
  ): Pagamento {
    const novoPagamento = new Pagamento();
    novoPagamento.id = randomUUID();
    novoPagamento.statusPagamento = statusPagamento;
    novoPagamento.metodoPagamento = pedido.metodoPagamento;
    novoPagamento.valorPagamento = pedido.preco;
    novoPagamento.dataCriacao = new Date();
    novoPagamento.dataAtualizacao = new Date();
    novoPagamento.pedidoId = pedido.id;

    return novoPagamento;
  }
}

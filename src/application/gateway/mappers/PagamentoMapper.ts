import { Pagamento } from 'src/domain/entities/Pagamento';
import { PagamentoEntity } from 'src/infrastructure/db/entities/PagamentoEntity';

export class PagamentoMapper {
  static toDomin(pagamentoEntity: PagamentoEntity): Pagamento {
    const pagamento = new Pagamento();
    pagamento.id = pagamentoEntity._id;
    pagamento.metodoPagamento = pagamentoEntity.metodoPagamento;
    pagamento.pedidoId = pagamentoEntity.pedidoId;
    pagamento.qrCode = pagamentoEntity.qrCode;
    pagamento.statusPagamento = pagamentoEntity.statusPagamento;
    pagamento.valorPagamento = pagamentoEntity.valorPagamento;
    pagamento.dataAtualizacao = pagamentoEntity.dataAtualizacao;
    pagamento.dataCriacao = pagamentoEntity.dataCriacao;

    return pagamento;
  }

  static toEntity(pagamento: Pagamento): PagamentoEntity {
    const pagamentoEntity = new PagamentoEntity();
    pagamentoEntity._id = pagamento.id;
    pagamentoEntity.metodoPagamento = pagamento.metodoPagamento;
    pagamentoEntity.pedidoId = pagamento.pedidoId;
    pagamentoEntity.qrCode = pagamento.qrCode;
    pagamentoEntity.statusPagamento = pagamento.statusPagamento;
    pagamentoEntity.valorPagamento = pagamento.valorPagamento;
    pagamentoEntity.dataAtualizacao = pagamento.dataAtualizacao;
    pagamentoEntity.dataCriacao = pagamento.dataCriacao;

    return pagamentoEntity;
  }
}

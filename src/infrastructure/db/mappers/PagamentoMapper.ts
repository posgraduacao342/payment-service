import { Pagamento } from 'src/domain/entities/Pagamento';
import { MetodoPagamento, StatusPagamento } from 'src/domain/enums';

export class PagamentoMapper {
  static mapToPagamento(item: any): Pagamento {
    console.log(item);
    return {
      id: item.id.S,
      pedidoId: item.pedidoId.S,
      statusPagamento: StatusPagamento[item.statusPagamento.S],
      valorPagamento: +item.valorPagamento.N,
      metodoPagamento: MetodoPagamento[item.metodoPagamento.S],
      dataCriacao: new Date(),
      dataAtualizacao: new Date(),
      dataDelecao: null,
      qrCode: item.qrCode?.S ?? null,
    } as any;
  }
}

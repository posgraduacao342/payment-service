import { MetodoPagamento, StatusPagamento } from '../enums';

export class Pagamento {
  id: string;
  pedidoId: string;
  statusPagamento: StatusPagamento;
  valorPagamento: number;
  metodoPagamento: MetodoPagamento;
  dataCriacao: Date;
  dataAtualizaacao: Date;
  dataDelecao: Date;
  qrCode: string;
}

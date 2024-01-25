import { PedidoMP } from '../entities/PedidoMp';
import { StatusPagamentoReponse } from '../entities/StatusPagamentoResponse';

export const MercadoPagoPortKey = 'IMercadoPagoPort';

export interface MercadoPagoPort {
  gerarQrcode(body: PedidoMP): Promise<string>;
  buscarInfoPagamento(pagamentoId: string): Promise<StatusPagamentoReponse>;
}

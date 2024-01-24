import { PedidoMP } from '../entities/PedidoMp';

export const MercadoPagoPortKey = 'IMercadoPagoPort';

export interface MercadoPagoPort {
  gerarQrcode(body: PedidoMP): Promise<string>;
}

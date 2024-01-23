import { Pedido } from 'src/domain/entities/Pedido';

export const MercadoPagoGatewayPortKey = 'IMercadoPagoGatewayPort';

export interface MercadoPagoGatewayPort {
  gerarQrcode(pedido: Pedido): Promise<string>;
}

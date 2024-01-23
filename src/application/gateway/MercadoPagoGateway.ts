import { Pedido } from 'src/domain/entities/Pedido';
import { MercadoPagoGatewayPort } from 'src/domain/ports/out/MercadoPagoGatewayPort';

export class MercadoPagoGateway implements MercadoPagoGatewayPort {
  gerarQrcode(pedido: Pedido): Promise<string> {
    return new Promise(() => '');
  }
}

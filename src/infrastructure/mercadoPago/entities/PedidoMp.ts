import { ItemMP } from './ItemMp';

export class PedidoMP {
  external_reference: string;
  total_amount: number;
  items: ItemMP[];
  title: string;
  expiration_date: Date;
  notification_url: string;
  description: string;

  constructor(
    external_reference: string,
    total_amount: number,
    notification_url: string,
    diasDeExpiracao: number,
  ) {
    this.title = 'Pedido da lanchonete';
    this.external_reference = external_reference;
    this.total_amount = total_amount;
    this.expiration_date = this.gerarDataDeExpiracao(diasDeExpiracao);
    this.notification_url = notification_url;
    this.items = [];
    this.description = '';
  }

  adicionarItem(item: ItemMP): void {
    this.items.push(item);
  }

  private gerarDataDeExpiracao(diasDeExpiracao: number): Date {
    const currentDateTime = new Date();
    const expirationDateTime = new Date(currentDateTime);
    expirationDateTime.setDate(currentDateTime.getDate() + diasDeExpiracao);

    return expirationDateTime;
  }
}

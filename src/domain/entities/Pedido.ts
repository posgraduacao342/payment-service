import { MetodoPagamento } from '../enums';
import { Item } from './Item';

export class Pedido {
  id: string;
  preco: number;
  itens: Item[];
  metodoPagamento: MetodoPagamento;
}

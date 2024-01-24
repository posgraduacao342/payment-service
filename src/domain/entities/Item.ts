import { Produto } from './Produto';

export class Item {
  id: string;
  produto: Produto;
  observacoes: string;
  quantidade: number;

  calcularTotal(): number {
    const quantidade = this.quantidade;
    const valorUnitario = this.produto.preco;

    return valorUnitario * quantidade;
  }
}

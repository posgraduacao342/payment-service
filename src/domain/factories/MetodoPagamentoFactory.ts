import { BadRequestException, Injectable } from '@nestjs/common';
import { MetodoPagamento } from '../enums';
import { MetodoDePagamentoStrategyPort } from '../ports/out/MetodoDePagamentoStrategyPort';
import { DinheiroStrategy } from '../strategies/DinheiroStrategy';
import { MercadoPagoQRCodeStrategy } from '../strategies/MercadoPagoQRCodeStrategy';

@Injectable()
export class MetodoPagamentoFactory {
  private estrategias: {
    [key in MetodoPagamento]: MetodoDePagamentoStrategyPort;
  };

  constructor(
    private readonly mercadoPagoStrategy: MercadoPagoQRCodeStrategy,
    private readonly dinheiroStrategy: DinheiroStrategy,
  ) {
    this.estrategias = {
      [MetodoPagamento.MERCADO_PAGO]: this.mercadoPagoStrategy,
      [MetodoPagamento.DINHEIRO]: this.dinheiroStrategy,
    };
  }

  public obterEstrategia(
    metodoPagamento: MetodoPagamento,
  ): MetodoDePagamentoStrategyPort {
    if (this.estrategias[metodoPagamento] !== undefined) {
      return this.estrategias[metodoPagamento];
    } else {
      throw new BadRequestException('Método de pagamento não suportado');
    }
  }
}

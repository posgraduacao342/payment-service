import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { PagamentoProducerGatewayPort } from 'src/domain/ports/out/PagamentoProducerGatewayPort';

@Injectable()
export class PagamentoProducerGateway implements PagamentoProducerGatewayPort {
  private exchange: string;

  constructor(private readonly amqpConnetion: AmqpConnection) {
    this.exchange = 'amq.direct';
  }

  async publicarPagamentoEstornado(
    pedidoId: string,
    clienteId?: string,
  ): Promise<void> {
    await this.amqpConnetion.publish(this.exchange, 'pagamento.estornado', {
      pedidoId,
      clienteId,
    });
  }

  async publicarPagamentoAprovado(
    pedidoId: string,
    clienteId?: string,
  ): Promise<void> {
    await this.amqpConnetion.publish(this.exchange, 'pagamento.aprovado', {
      pedidoId,
      clienteId,
    });
  }

  async publicarPagamentoRejeitado(
    pedidoId: string,
    clienteId?: string,
  ): Promise<void> {
    await this.amqpConnetion.publish(this.exchange, 'pagamento.rejeitado', {
      pedidoId,
      clienteId,
    });
  }
}

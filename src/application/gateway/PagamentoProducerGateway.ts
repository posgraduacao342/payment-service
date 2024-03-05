import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { PagamentoProducerGatewayPort } from 'src/domain/ports/out/PagamentoProducerGatewayPort';

@Injectable()
export class PagamentoProducerGateway implements PagamentoProducerGatewayPort {
  private exchange: string;

  constructor(private readonly amqpConnetion: AmqpConnection) {
    this.exchange = 'amq.direct';
  }

  async publicarPagamentoAprovado(
    pedidoId: string,
    clienteId?: string,
  ): Promise<void> {
    try {
      await this.amqpConnetion.publish(this.exchange, 'pagamento.aprovado', {
        pedidoId,
        clienteId,
      });
    } catch (error) {
      console.log(error);
    }
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

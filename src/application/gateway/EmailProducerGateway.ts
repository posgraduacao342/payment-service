import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { EmailProducerGatewayPort } from 'src/domain/ports/out/EmailProducerGatewayPort';

@Injectable()
export class EmailProducerGateway implements EmailProducerGatewayPort {
  private exchange: string;

  constructor(private readonly amqpConnetion: AmqpConnection) {
    this.exchange = 'amq.direct';
  }

  async publicarEmailPagamentoComSucesso(
    total: number,
    email?: string,
  ): Promise<void> {
    if (!email) return;

    const texto = `Seu pagamento no valor de ${total} foi pago com sucesso!`;
    await this.amqpConnetion.publish(this.exchange, 'enviar.email', {
      destinatario: email,
      texto,
      assunto: 'Pagamento',
    });
  }

  async publicarEmailPagamentoRejeitado(
    total: number,
    email: string,
  ): Promise<void> {
    if (!email) return;

    const texto = `Seu pagamento no valor de ${total} foi rejeitado!`;
    await this.amqpConnetion.publish(this.exchange, 'enviar.email', {
      destinatario: email,
      texto,
      assunto: 'Pagamento',
    });
  }
}

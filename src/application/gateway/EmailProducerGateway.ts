import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { EmailProducerGatewayPort } from 'src/domain/ports/out/EmailProducerGatewayPort';

@Injectable()
export class EmailProducerGateway implements EmailProducerGatewayPort {
  private exchange: string;

  constructor(private readonly amqpConnetion: AmqpConnection) {
    this.exchange = 'amq.direct';
  }

  async publicarEmailPagamentoEstornado(email?: string): Promise<void> {
    if (!email) return;

    const texto = `Seu pedido foi estornado com sucesso!`;
    await this.amqpConnetion.publish(this.exchange, 'enviar.email', {
      destinatario: email,
      texto,
      assunto: 'Estorno',
    });
  }

  async publicarEmailPagamentoComSucesso(email?: string): Promise<void> {
    if (!email) return;

    const texto = `Seu pagamento realizado com sucesso!`;
    await this.amqpConnetion.publish(this.exchange, 'enviar.email', {
      destinatario: email,
      texto,
      assunto: 'Pagamento',
    });
  }

  async publicarEmailAguardandoPagamento(
    total: number,
    email?: string,
  ): Promise<void> {
    if (!email) return;

    const texto = `QR Code gerado no valor de ${total}. Estamso aguardando seu pagamento para dar andamento com o pedido.`;
    await this.amqpConnetion.publish(this.exchange, 'enviar.email', {
      destinatario: email,
      texto,
      assunto: 'Pagamento',
    });
  }

  async publicarEmailPagamentoRejeitado(email: string): Promise<void> {
    if (!email) return;

    const texto = `Seu pagamento foi rejeitado!`;
    await this.amqpConnetion.publish(this.exchange, 'enviar.email', {
      destinatario: email,
      texto,
      assunto: 'Pagamento Rejeitado',
    });
  }
}

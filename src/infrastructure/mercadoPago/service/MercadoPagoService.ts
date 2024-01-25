import { Inject } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { PedidoMP } from '../entities/PedidoMp';
import { MercadoPagoPort } from '../port/MercadoPagoPort';
import { QRCodeResponse } from '../entities/QRCodeResponse';
import { StatusPagamentoReponse } from '../entities/StatusPagamentoResponse';

export class MercadoPagoService implements MercadoPagoPort {
  private uriQRCode: string;
  private uriStatusPagamento: string;
  private token: string;
  public statusPagoComSucesso: string;

  constructor(
    @Inject('AxiosIntance') private readonly axiosInstance: AxiosInstance,
  ) {
    this.uriQRCode =
      '/instore/orders/qr/seller/collectors/1467136605/pos/test123456/qrs';
    this.token = `Bearer ${process.env.MERCADO_PAGO_TOKEN}`;
    this.uriStatusPagamento = '/v1/payments';
  }

  async buscarInfoPagamento(
    pagamentoId: string,
  ): Promise<StatusPagamentoReponse> {
    const { data } = await this.axiosInstance.get<StatusPagamentoReponse>(
      `${this.uriStatusPagamento}/${pagamentoId}`,
      {
        headers: {
          Authorization: this.token,
        },
      },
    );

    return data;
  }

  async gerarQrcode(body: PedidoMP): Promise<string> {
    const { data } = await this.axiosInstance.post<QRCodeResponse>(
      this.uriQRCode,
      body,
      {
        headers: {
          Authorization: this.token,
        },
      },
    );

    return data.qr_data;
  }
}

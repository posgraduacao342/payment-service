import { Inject } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { PedidoMP } from '../entities/PedidoMp';
import { MercadoPagoPort } from '../port/MercadoPagoPort';
import { QRCodeResponse } from '../entities/QRCodeResponse';

export class MercadoPagoService implements MercadoPagoPort {
  private uri: string;
  constructor(
    @Inject('AxiosIntance') private readonly axiosInstance: AxiosInstance,
  ) {
    this.uri =
      '/instore/orders/qr/seller/collectors/1467136605/pos/test123456/qrs';
  }

  async gerarQrcode(body: PedidoMP): Promise<string> {
    const { data } = await this.axiosInstance.post<QRCodeResponse>(
      this.uri,
      body,
      {
        headers: {
          Authorization: `Bearer ${process.env.MERCADO_PAGO_TOKEN}`,
        },
      },
    );

    return data.qr_data;
  }
}

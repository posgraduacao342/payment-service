import { Inject } from '@nestjs/common';
import { PedidoMP } from '../entities/PedidoMp';
import { MercadoPagoPort } from '../port/MercadoPagoPort';
import { AxiosInstance } from 'axios';
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
    try {
      const { data } = await this.axiosInstance.post<QRCodeResponse>(
        this.uri,
        body,
        {
          headers: {
            Authorization:
              'Bearer APP_USR-1205513195900433-090211-9f4253ec298e832217a72d272f830d97-1467136605',
          },
        },
      );

      return data.qr_data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

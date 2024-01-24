import { Module } from '@nestjs/common';
import { MercadoPagoPortKey } from './port/MercadoPagoPort';
import axios from 'axios';
import { MercadoPagoService } from './service/MercadoPagoService';

@Module({
  providers: [
    {
      provide: 'AxiosIntance',
      useFactory: () => {
        return axios.create({ baseURL: 'https://api.mercadopago.com' });
      },
    },
    {
      provide: MercadoPagoPortKey,
      useClass: MercadoPagoService,
    },
  ],
  exports: [
    {
      provide: MercadoPagoPortKey,
      useClass: MercadoPagoService,
    },
  ],
})
export class MercadoPagoModule {}

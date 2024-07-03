import { Global, Module } from '@nestjs/common';
import { MercadoPagoPortKey } from './port/MercadoPagoPort';
import axios from 'axios';
import { MercadoPagoService } from './service/MercadoPagoService';

@Global()
@Module({
  providers: [
    {
      provide: 'AxiosIntance',
      useFactory: () => {
        return axios.create({ baseURL: process.env.MERCADO_PAGO_URL });
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

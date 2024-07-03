import { Global, Module } from '@nestjs/common';
import axios from 'axios';
import { AccounApiService } from './service/AccountApiService';
import { AccountApiPortKey } from './port/AccountApiPort';

@Global()
@Module({
  providers: [
    {
      provide: 'AxiosIntance',
      useFactory: () => {
        return axios.create({ baseURL: process.env.ACCOUNT_API_URL });
      },
    },
    {
      provide: AccountApiPortKey,
      useClass: AccounApiService,
    },
  ],
  exports: [
    {
      provide: AccountApiPortKey,
      useClass: AccounApiService,
    },
  ],
})
export class AccountApiModule {}

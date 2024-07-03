import { Inject } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { AccountApiPort } from '../port/AccountApiPort';

export class AccounApiService implements AccountApiPort {
  private uriQRCode: string;

  constructor(
    @Inject('AxiosIntance') private readonly axiosInstance: AxiosInstance,
  ) {
    this.uriQRCode = '/clientes/id';
  }

  async buscarEmailUsuario(clienteId: string): Promise<string> {
    const { data } = await this.axiosInstance.get<{ email: string }>(
      `${this.uriQRCode}/${clienteId}`,
    );

    return data.email;
  }
}

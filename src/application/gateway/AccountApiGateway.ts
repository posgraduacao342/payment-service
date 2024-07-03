import { Inject } from '@nestjs/common';
import { AccountApiGatewayPort } from 'src/domain/ports/out/AccountApiGatewayPort';
import {
  AccountApiPort,
  AccountApiPortKey,
} from 'src/infrastructure/accountApi/port/AccountApiPort';

export class AccountApiGateway implements AccountApiGatewayPort {
  constructor(
    @Inject(AccountApiPortKey)
    private readonly accountApi: AccountApiPort,
  ) {}

  async buscarEmailUsuario(clienteId: string): Promise<string> {
    try {
      return await this.accountApi.buscarEmailUsuario(clienteId);
    } catch (error) {
      console.log('Erro ao tentar obter o email do cliente');
    }
  }
}

export const AccountApiGatewayPorttKey = 'IAccountApiGatewayPort';

export interface AccountApiGatewayPort {
  buscarEmailUsuario(clienteId: string): Promise<string>;
}

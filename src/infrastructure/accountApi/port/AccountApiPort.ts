export const AccountApiPortKey = 'IAccountApiPort';

export interface AccountApiPort {
  buscarEmailUsuario(clienteId: string): Promise<string>;
}

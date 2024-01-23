import { Pagamento } from 'src/domain/entities/Pagamento';
import { PagamentoRepositoryPort } from './PagamentoRepositoryPort';
import { Injectable } from '@nestjs/common';
import {
  GetCommand,
  GetCommandInput,
  PutCommand,
  PutCommandInput,
  ScanCommandInput,
  UpdateCommand,
  UpdateCommandInput,
} from '@aws-sdk/lib-dynamodb';
import { DbClientsProvider } from '../config/DbClientProvider';
import { ScanCommand } from '@aws-sdk/client-dynamodb';
import { PagamentoMapper } from '../mappers/PagamentoMapper';

@Injectable()
export class PagamentoRepository implements PagamentoRepositoryPort {
  private readonly tableName: string;

  constructor(private readonly dbClientsProvider: DbClientsProvider) {
    this.tableName = 'pagamentos';
  }

  async obterPagamentos(): Promise<Pagamento[]> {
    const params: ScanCommandInput = {
      TableName: this.tableName,
      Limit: 10,
    };

    const data = await this.dbClientsProvider.dbDocumentClient.send(
      new ScanCommand(params),
    );

    return data.Items.map((item: any) => PagamentoMapper.mapToPagamento(item));
  }

  async criarPagamento(pagamento: Pagamento): Promise<Pagamento> {
    const params: PutCommandInput = {
      TableName: this.tableName,
      Item: pagamento,
    };

    await this.dbClientsProvider.dbDocumentClient.send(new PutCommand(params));

    return pagamento;
  }

  async atualizarStatusPagamento(pagamento: Pagamento): Promise<Pagamento> {
    const params: UpdateCommandInput = {
      TableName: this.tableName,
      Key: {
        pedidoId: pagamento.pedidoId,
      },
      UpdateExpression: 'SET #statusPagamento = :statusPagamento',
      ExpressionAttributeNames: {
        '#statusPagamento': 'statusPagamento',
      },
      ExpressionAttributeValues: {
        ':statusPagamento': pagamento.statusPagamento,
      },
    };

    await this.dbClientsProvider.dbDocumentClient.send(
      new UpdateCommand(params),
    );

    return pagamento;
  }

  async atualizarQRCode(pagamento: Pagamento): Promise<Pagamento> {
    const params: UpdateCommandInput = {
      TableName: this.tableName,
      Key: {
        id: pagamento.id,
        pedidoId: pagamento.pedidoId,
      },
      UpdateExpression: 'SET #statusPagamento = :statusPagamento',
      ExpressionAttributeNames: {
        '#statusPagamento': 'statusPagamento',
      },
      ExpressionAttributeValues: {
        ':statusPagamento': pagamento.statusPagamento,
      },
    };

    await this.dbClientsProvider.dbDocumentClient.send(
      new UpdateCommand(params),
    );

    return pagamento;
  }

  async obterPagamentoPorIdDoPedido(
    pedidoId: string,
  ): Promise<Pagamento | null> {
    const params: GetCommandInput = {
      TableName: this.tableName,
      Key: {
        pedidoId: pedidoId,
      },
    };

    const data = await this.dbClientsProvider.dbDocumentClient.send(
      new GetCommand(params),
    );

    return data?.Item ? PagamentoMapper.mapToPagamento(data.Item) : null;
  }
}

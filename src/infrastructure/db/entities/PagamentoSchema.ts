import {
  CreateTableCommand,
  CreateTableInput,
  DescribeTableCommand,
} from '@aws-sdk/client-dynamodb';
import { DbClientsProvider } from '../config/DbClientProvider';

const appTableParams: CreateTableInput = {
  TableName: 'pagamentos',
  KeySchema: [
    // {
    //   AttributeName: 'id',
    //   KeyType: 'HASH',
    // },
    {
      AttributeName: 'pedidoId',
      KeyType: 'HASH',
    },
  ],
  AttributeDefinitions: [
    // { AttributeName: 'id', AttributeType: 'S' },
    { AttributeName: 'pedidoId', AttributeType: 'S' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
};

export async function initAppTable() {
  const provider = new DbClientsProvider();

  try {
    await provider.dbDocumentClient.send(
      new DescribeTableCommand({ TableName: appTableParams.TableName }),
    );
  } catch (error) {
    if (error.name === 'ResourceNotFoundException') {
      await provider.dbDocumentClient.send(
        new CreateTableCommand(appTableParams),
      );
      console.log('A tabela foi criada com sucesso.');
    } else {
      throw error;
    }
  }
}

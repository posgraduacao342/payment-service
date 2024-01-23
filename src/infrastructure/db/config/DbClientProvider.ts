import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DbClientsProvider {
  public dbClient: DynamoDBClient;
  public dbDocumentClient: DynamoDBDocumentClient;

  constructor() {
    const marshallOptions = {
      convertEmptyValues: false,
      removeUndefinedValues: false,
      convertClassInstanceToMap: true,
    };
    const unmarshallOptions = {
      wrapNumbers: false,
    };
    const translateConfig = { marshallOptions, unmarshallOptions };

    this.dbClient = new DynamoDBClient({
      region: 'us-east-1',
      endpoint: 'http://dynamodb:8000',
      credentials: {
        accessKeyId: 'AKIAZCLSBDBVNTKVUTMK',
        secretAccessKey: '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',
      },
    });
    this.dbDocumentClient = DynamoDBDocumentClient.from(
      this.dbClient,
      translateConfig,
    );
  }

  /**
   * Destroys the Dbclients
   */
  destroy() {
    this.dbDocumentClient.destroy();
    this.dbClient.destroy();
  }
}

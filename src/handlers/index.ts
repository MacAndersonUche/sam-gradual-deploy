import { APIGatewayEvent } from 'aws-lambda';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const main = async (id: string) => {
  const command = new PutCommand({
    TableName: 'traced-table',
    Item: {
      id,
    },
  });

  const response = await docClient.send(command);
  console.log(response);
  return response;
};

export const handler = async (event: APIGatewayEvent) => {
  try {
    console.log('SourceIP =', event.requestContext.identity.sourceIp);

    // await main(id);

    // throw Error('ERROR');
    return {
      statusCode: 200,
      body: JSON.stringify({
        hi: 'here',
        // id,
        sourceIp: event.requestContext.identity.sourceIp,
        message: 'still showing',
      }),
    };
  } catch (e) {
    console.log(e);
  }
};

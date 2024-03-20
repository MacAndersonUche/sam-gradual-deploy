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
    // const { id }: { id: string } = JSON.parse(event.body!);

    // await main(id);

    return {
      statusCode: 200,
      body: JSON.stringify({ hi: 'here' }),
    };
  } catch (e) {
    console.log(e);
  }
};

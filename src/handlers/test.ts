import { APIGatewayEvent } from 'aws-lambda';

console.log('Loading function');
export const handler = async (
  event: APIGatewayEvent,
  _: any,
  callback: any
) => {
  console.log('SourceIP =', event.requestContext.identity.sourceIp);
  callback(null, event.requestContext.identity.sourceIp);
};

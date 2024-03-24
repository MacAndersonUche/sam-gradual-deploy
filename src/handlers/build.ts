import {
  CodeBuildClient,
  ListBuildBatchesForProjectCommand,
  ListBuildsForProjectCommand,
  RetryBuildCommand,
  SortOrderType,
  StatusType,
} from '@aws-sdk/client-codebuild'; // ES Modules import
// const { CodeBuildClient, ListBuildsCommand } = require("@aws-sdk/client-codebuild"); // CommonJS import
const client = new CodeBuildClient({ region: 'eu-west-2' });
const input = {
  // ListBuildsInput
  projectName: 'TestProject',
  sortOrder: SortOrderType.DESCENDING,
};
const retryInput = {
  // ListBuildsInput
  id: 'TestProject:3dd0dfb1-5ef5-4e6f-9414-f63ecd9dfbab',
};
async function name() {
  const command = new ListBuildsForProjectCommand(input);
  return await client.send(command);
}
async function retry() {
  const command = new RetryBuildCommand(retryInput);
  return await client.send(command);
}

retry().then((res) => console.log({ res }));
// { // ListBuildsOutput
//   ids: [ // BuildIds
//     "STRING_VALUE",
//   ],
//   nextToken: "STRING_VALUE",
// };

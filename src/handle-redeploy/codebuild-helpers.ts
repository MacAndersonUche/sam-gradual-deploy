import { CodeBuildClient, StartBuildCommand } from '@aws-sdk/client-codebuild'; // ES Modules import

const client = new CodeBuildClient({ region: 'eu-west-2' });

export function createBuildClient(projectName: string) {
  const input = {
    projectName,
  };
  const command = new StartBuildCommand(input);

  console.log({ command });
  return client.send(command);
}

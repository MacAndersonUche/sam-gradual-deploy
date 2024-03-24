import { SQSEvent } from 'aws-lambda';
import { handleGithub } from './github-helpers';
import { createBuildClient } from './codebuild-helpers';

export const handler = async (event: SQSEvent) => {
  try {
    const body = JSON.parse(event.Records[0].body);

    const projectName = body.detail['project-name'] as string;

    await handleGithub(projectName);

    await createBuildClient(projectName);

    //TO DO: SEND NOTIFICATION TO SLACK

    return {
      statusCode: 200,
    };
  } catch (e) {
    console.log(e);
  }
};

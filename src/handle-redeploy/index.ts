import { SNSEvent, SQSEvent } from 'aws-lambda';
import { handleGithub } from './github-helpers';
import { createBuildClient } from './codebuild-helpers';
import dotenv from 'dotenv';

export const handler = async (event: SQSEvent) => {
  try {
    console.log(
      'SQS EVENT FROM EVENT BRIDGE',
      JSON.parse(event.Records[0].body)
    );

    const body = JSON.parse(event.Records[0].body);

    const projectName = body.detail['project-name'] as string;

    console.log({ projectName });
    //5th step using the project name and the aws-sdk create a build for codebuild

    // await handleGithub('sam-gradual-deploy');

    // await createBuildClient('sam-gradual-deploy');

    return {
      statusCode: 200,
    };
  } catch (e) {
    console.log(e);
  }
};

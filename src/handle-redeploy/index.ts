import { SNSEvent, SQSEvent } from 'aws-lambda';
import { handleGithub } from './github-helpers';
import { createBuildClient } from './codebuild-helpers';
import dotenv from "dotenv"

export const handler = async (event: SQSEvent) => {
  try {
    //TO DO: GET PROJECT NAME FROM EVENT
    //1st step get the project name from SNS
    console.log('SQS MESSAGE', JSON.parse(event.Records[0].body));
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

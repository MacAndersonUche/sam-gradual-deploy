import { SNSEvent, SQSEvent } from 'aws-lambda';
import { handleGithub } from './github-helpers';
import { createBuildClient } from './codebuild-helpers';
require('dotenv').config();

export const handler = async (event: SQSEvent) => {
  try {
    //TO DO: GET PROJECT NAME FROM EVENT
    //1st step get the project name from SNS
    console.log('SQS MESSAGE', JSON.parse(event.Records[0].body));

    // await handleGithub('sam-gradual-deploy');
    //5th step using the project name and the aws-sdk create a build for codebuild

    await handleGithub('sam-gradual-deploy');

    await createBuildClient('sam-gradual-deploy');

    return {
      statusCode: 200,
      body: JSON.stringify({
        hi: 'here',
      }),
    };
  } catch (e) {
    console.log(e);
  }
};

handleGithub('sam-gradual-deploy').then((res) => console.log({ res }));

import { SNSEvent } from 'aws-lambda';
import { handleGithub } from './github-helpers';
import { createBuildClient } from './codebuild-helpers';
require('dotenv').config();

export const handler = async (event: SNSEvent) => {
  try {
    //TO DO: GET PROJECT NAME FROM EVENT
    //1st step get the project name from SNS
    console.log('SNS MESSAGE', JSON.parse(event.Records[0].Sns.Message));

    await handleGithub('sam-gradual-deploy');
    //5th step using the project name and the aws-sdk create a build for codebuild
    await createBuildClient('sam-gradual-deploy');

    console.log('JSJSJS');
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

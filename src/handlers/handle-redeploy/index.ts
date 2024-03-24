import { SNSEvent } from 'aws-lambda';
import { handleGithub } from './github-helpers';
require('dotenv').config();

export const handler = async (event: SNSEvent) => {
  try {
    //1st step get the project name from SNS
    console.log('SNS MESSAGE', JSON.parse(event.Records[0].Sns.Message));
    //2nd step reach out to github and find the atest opened PR ID using the project name

    //3rd step using that PR ID, create a revertPR using GraphQL API

    //4th step merge the latest PR created from above

    //5th step using the project name and the aws-sdk create a build for codebuild

    return {
      statusCode: 200,
      body: JSON.stringify({
        hi: 'here',
        // id,
        // message: 'still showing',
      }),
    };
  } catch (e) {
    console.log(e);
  }
};

handleGithub('sam-gradual-deploy').then((res) => console.log({ res }));

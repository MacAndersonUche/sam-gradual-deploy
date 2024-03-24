import { SNSEvent } from 'aws-lambda';
require('dotenv').config();

async function fetchPullRequests() {
  //     curl -L \
  //   -H "Accept: application/vnd.github+json" \
  //   -H "Authorization: Bearer <YOUR-TOKEN>" \
  //   -H "X-GitHub-Api-Version: 2022-11-28" \
  //   https://api.github.com/repos/OWNER/REPO/pulls

  const response = await fetch(
    'https://api.github.com/repos/MacAndersonUche/sam-gradual-deploy/pulls?state=all',
    {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data;
  }
  throw response.status;
}

fetchPullRequests().then((res) => console.log({ res }));
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

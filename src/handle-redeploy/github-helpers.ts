// import dotenv from 'dotenv';

// dotenv.config();

async function graphqlClient(graphqlQuery: string) {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${process.env.GITHUB_ACCESS_TOKEN!}`,
      'Content-Type': 'application/json',
    },
    body: graphqlQuery,
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
  throw response.status;
}
async function fetchPullRequestsIDByRepoName(repoName: string) {
  const response = await fetch(
    `https://api.github.com/search/issues?q=repo:TracedLtd/${repoName}+is:pr+is:merged`,
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
    if (data.total_count > 0) return data.items[0].html_url;
    return data;
  }
  throw response.status;
}

async function revertLastMergedPullRequestByID(id: string) {
  const graphqlQuery = JSON.stringify({
    query: `mutation {
      revertPullRequest(input: {
        pullRequestId: "${id}",
      }) {
      revertPullRequest  {
			id
		}
      }
    }`,
  });

  const responseData = await graphqlClient(graphqlQuery);

  return responseData;
}

async function mergeRevertedPullRequestByID(id: string) {
  const graphqlQuery = JSON.stringify({
    query: `mutation {
      mergePullRequest(input: {
        pullRequestId: "${id}",
      }) {
      pullRequest {
			state
		}
      }
    }`,
  });

  const responseData = await graphqlClient(graphqlQuery);

  return responseData;
}

//TO REMOVE NOW XX
/**
 * 
//2nd step reach out to github and find the atest opened PR ID using the project name
//3rd step using that PR ID, create a revertPR using GraphQL API
//4th step merge the latest PR created from above 1
 */
export async function handleGithub(repoName: string) {
  const lastMergedPRID = await fetchPullRequestsIDByRepoName(repoName);

  const { data } = await revertLastMergedPullRequestByID(lastMergedPRID);

  const revertedID = data.revertPullRequest.revertPullRequest.id;

  const merged = await mergeRevertedPullRequestByID(revertedID);

  return merged.data.mergePullRequest.pullRequest.state === 'MERGED'
    ? true
    : false;
}

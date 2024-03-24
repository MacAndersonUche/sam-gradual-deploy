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
    `https://api.github.com/repos/MacAndersonUche/${repoName}/pulls?state=closed`,
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
    if (data.length > 0) return data[0].node_id;
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
      pullRequest {
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
        pullRequestId: ${id},
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

export async function handleGithub(repoName: string) {
  const lastMergedPRID = await fetchPullRequestsIDByRepoName(repoName);

  console.log({ lastMergedPRID });

  const revertedPullRequestID = await revertLastMergedPullRequestByID(
    lastMergedPRID
  );

  console.log({ revertedPullRequestID });

  const merged = await mergeRevertedPullRequestByID(revertedPullRequestID);

  console.log({ merged: JSON.stringify(merged) });

  return merged === 'closed' ? true : false;
}
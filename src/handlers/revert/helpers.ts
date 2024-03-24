async function graphqlClient(graphqlQuery: string) {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${process.env.GITHUB_ACCESS_TOKEN!}`,
      'Content-Type': 'application/json',
    },
    body: graphqlQuery,
  });

  const responseData = await response.json();
  if (responseData.ok) {
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
        pullRequestId: ${id},
      }) {
      revertPullRequest {
			node_id
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
      revertPullRequest(input: {
        pullRequestId: ${id},
      }) {
      revertPullRequest {
			url
		}
      }
    }`,
  });

  const responseData = await graphqlClient(graphqlQuery);
  return {
    data: JSON.stringify(responseData),
  };
}

export async function handleGithub(repoName: string) {
  const lastMergedPRID = await fetchPullRequestsIDByRepoName(repoName);

  const revertedPullRequestID = await revertLastMergedPullRequestByID(
    lastMergedPRID
  );

  return await mergeRevertedPullRequestByID(revertedPullRequestID);
}

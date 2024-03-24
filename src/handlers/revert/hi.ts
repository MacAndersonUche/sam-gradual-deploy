async function createLabelAndAssignToIssue(
  token,
  repositoryId,
  issueId,
  labelId
) {
  const graphqlQuery = JSON.stringify({
    query: `mutation {
            createLabel(input: {
                repositoryId: "${repositoryId}",
                name: "bug",
                color: "d73a4a"
            }) {
                label {
                    id
                    name
                }
            }
            addLabelsToLabelable(input: {
                labelableId: "${issueId}",
                labelIds: ["${labelId}"]
            }) {
                clientMutationId
            }
        }`,
  });

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: graphqlQuery,
  });

  const responseData = await response.json();

  return responseData;
}

// Usage example
const token = 'YOUR_GITHUB_TOKEN';
const repositoryId = 'YOUR_REPOSITORY_ID';
const issueId = 'YOUR_ISSUE_ID';
const labelId = 'YOUR_LABEL_ID';

createLabelAndAssignToIssue(token, repositoryId, issueId, labelId)
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

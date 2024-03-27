const axios = require('axios');
require('dotenv').config();

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function checkGithubWorkflowStatus() {
  const url = `https://api.github.com/repos/TracedLtd/Control-E2E-Tests/actions/workflows/e2e-tests-pipeline.yml/runs`;
  const headers = {
    Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  try {
    let response;
    let hasBeenCompleted = false;
    do {
      response = await axios.get(url, { headers });

      if (response.status === 200) {
        const workflowStatus = response.data.workflow_runs[0];

        console.log({ workflowStatus });
        if (workflowStatus === 'completed') {
          if (response.data.conclusion === 'success') {
            console.log('GitHub Actions workflow succeeded.');
            hasBeenCompleted = true;
            return true;
          } else {
            console.log('GitHub Actions workflow failed.');
            hasBeenCompleted = true;
            return false;
          }
        } else {
          // Wait for 30 seconds before checking again
          await sleep(15000);
        }
      } else {
        throw response;
      }
    } while (hasBeenCompleted);
  } catch (error) {
    console.error('Error checking workflow status:', error);
    return false;
  }
}

// Call the function to start checking GitHub workflow status
checkGithubWorkflowStatus();

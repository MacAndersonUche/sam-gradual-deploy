const axios = require('axios');

require('dotenv').config();
async function triggerGithubWorkflow() {
  const url =
    'https://api.github.com/repos/TracedLtd/Control-E2E-Tests/actions/workflows/e2e-tests-pipeline.yml/dispatches';
  const headers = {
    Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  const data = {
    ref: 'main',
  };
  try {
    const response = await axios.post(url, data, { headers });
    if (response.status === 204) {
      console.log('Workflow triggered successfully.');
    } else {
      console.log('Failed to trigger workflow.');
    }
  } catch (error) {
    console.error('Error triggering workflow:', error);
    process.exit(1);
  }
}

triggerGithubWorkflow();

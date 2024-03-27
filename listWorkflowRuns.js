const axios = require('axios');

require('dotenv').config();
async function checkGithubWorkflowStatus() {
  const url = `https://api.github.com/repos/TracedLtd/Control-E2E-Tests/actions/runs`;
  const headers = {
    Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  try {
    const response = await axios.get(url, { headers });
    if (response.status === 200) {
      const workflowStatus = response.data.status;
      if (
        workflowStatus === 'completed' &&
        response.data.conclusion !== 'success'
      ) {
        console.log('GitHub Actions workflow failed.');
        process.exit(1);
      } else {
        console.log('GitHub Actions workflow succeeded.');
      }
    } else {
      console.log('Failed to check workflow status.');
      process.exit(1);
    }
  } catch (error) {
    console.error('Error checking workflow status:', error);
    process.exit(1);
  }
}

checkGithubWorkflowStatus();

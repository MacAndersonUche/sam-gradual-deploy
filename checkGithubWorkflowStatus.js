const axios = require('axios');
async function checkGithubWorkflowStatus(runId) {
  const url = `https://api.github.com/repos/<owner>/<repo-b>/actions/runs/${runId}`;
  const headers = {
    Authorization: 'token <your-github-token>',
    Accept: 'application/vnd.github.v3+json',
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
const runId = process.argv[3];
checkGithubWorkflowStatus(runId);

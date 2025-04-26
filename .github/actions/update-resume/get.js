const core = require('@actions/core');
const github = require('@actions/github');

try {
  const fileUrl = process.env.FILE_URL;
  console.log(`Hello ${fileUrl}!`);
  core.setOutput('raw-data', fileUrl);
} catch (error) {
  core.setFailed(error.message);
}

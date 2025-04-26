const core = require('@actions/core');
const github = require('@actions/github');

try {
  const fileUrl = core.getInput('file-url');
  console.log(`Hello ${fileUrl}!`);
} catch (error) {
  core.setFailed(error.message);
}

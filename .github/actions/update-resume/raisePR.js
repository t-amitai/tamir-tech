const core = require('@actions/core');
const github = require('@actions/github');

try {
    const token = process.env.GITHUB_TOKEN;
    const fileUrl = process.env.FILE_URL;
    
    const octokit = github.getOctokit(token);

    const { owner, repo } = github.context.repo;

    octokit.rest.pulls.create({
        owner,
        repo,
        title: 'Add new file via GitHub Actions',
        head: fileUrl,
        base: 'main',
        body: 'This PR contains a new encrypted resume added by GitHub Actions.',
    }).then(pr => {
        console.log(`Pull request created: ${pr.html_url}`);
    });

} catch (error) {
    core.setFailed(error.message);
  }


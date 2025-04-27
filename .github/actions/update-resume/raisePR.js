const core = require('@actions/core');
const github = require('@actions/github');

try {
    const token = core.getInput('GITHUB_TOKEN');
    
    const octokit = github.getOctokit(token);

    const { owner, repo } = github.context.repo;

    octokit.rest.pulls.create({
        owner,
        repo,
        title: 'Add new file via GitHub Actions',
        head: 'update-resume-branch',
        base: 'main',
        body: 'This PR contains a new encrypted resume added by GitHub Actions.',
    }).then(pr => {
        console.log(`Pull request created: ${pr.html_url}`);
    });

} catch (error) {
    core.setFailed(error.message);
  }


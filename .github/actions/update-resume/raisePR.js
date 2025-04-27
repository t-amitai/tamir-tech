const core = require('@actions/core');
const github = require('@actions/github');

try {
    const token = core.getInput('GITHUB_TOKEN');
    
    const octokit = github.getOctokit(token);

    const { owner, repo } = github.context.repo;
    const branch = 'update-resume-branch';

    const { data: pr } = await octokit.rest.pulls.create({
        owner,
        repo,
        title: 'Add new file via GitHub Actions',
        head: branch,
        base: 'main',
        body: 'This PR contains a new encrypted resume added by GitHub Actions.',
    });

    console.log(`Pull request created: ${pr.html_url}`);
} catch (error) {
    console.error('Error creating pull request:', error);
}


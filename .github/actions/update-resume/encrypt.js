const core = require('@actions/core');
const github = require('@actions/github');

try {
    const rawData = process.env.RAW_DATA;
    console.log(rawData);
} catch (error) {
    core.setFailed(error.message);
}
const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const crypto = require('crypto');
const base64 = require('base64');

try {
    const rawData = process.env.RAW_DATA;
    const key = process.env.RESUME_KEY; 
    const algorithm = 'aes-256-cbc';

    function encrypt(string) {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'utf-8'), iv);
        let encrypted = cipher.update(string, 'utf-8', 'hex');
        encrypted += cipher.final('hex');
        return base64.encode(iv.toString('hex') + ':' + encrypted);
    }

    const encryptedData = encrypt(rawData);

    const resumePath = './server/assets/resume.txt';
    fs.writeFileSync(resumePath, encryptedData);
} catch (error) {
    core.setFailed(error.message);
}
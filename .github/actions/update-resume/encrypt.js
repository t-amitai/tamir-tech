const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const fernet = require('fernet');

try {
    const rawData = process.env.RAW_DATA;
    const key = process.env.RESUME_KEY; 
    const secret = new fernet.Secret(key);

    const token = new fernet.Token({
        secret: secret
    });

    const encryptedData = token.encode(rawData);

    fs.writeFile('./server/assets/resume.txt', encryptedData, (err) => {
      if (err) {
        console.error('Error writing encrypted file:', err);
      } else {
        console.log('Encryption successful');
      }
    });

} catch (error) {
    core.setFailed(error.message);
}
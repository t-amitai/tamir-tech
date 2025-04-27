const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const fernet = require('fernet');

try {
    const rawData = process.env.RAW_DATA;
    const key = process.env.RESUME_KEY; 

    const token = new fernet.Token({
      secret: key,
      payload: rawData
    });
    
    const encrypted = token.encode();

    fs.writeFile('./server/assets/resume.txt', encrypted, (err) => {
      if (err) {
        console.error('Error writing encrypted file:', err);
      } else {
        console.log('Encryption successful');
      }
    });

} catch (error) {
    core.setFailed(error.message);
}
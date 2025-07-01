const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const fernet = require('fernet');

try {
    const rawData1 = process.env.RAW_DATA_1;
    const rawData2 = process.env.RAW_DATA_2;
    const key = process.env.RESUME_KEY; 
    const secret = new fernet.Secret(key);

    const token = new fernet.Token({
        secret: secret
    });
    
    const rawData = rawData1 + rawData2;
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
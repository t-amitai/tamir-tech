const core = require('@actions/core');
const github = require('@actions/github');
const {google} = require('googleapis');

const parseFileID = (url) => {
  const array = url.split('/');
  for (let i = 0; i<array.length; i++) {
    if (array[i] === 'd') {
      return array[i+1];
    }
  }
}

try {
  const fileUrl = process.env.FILE_URL;
  const fileId = parseFileID(fileUrl);

  const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: serviceAccount.client_email,
      private_key: serviceAccount.private_key,
    },
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  auth.getClient().then(authClient => {
    let chunks = [];
    const drive = google.drive({ version: 'v3', auth: authClient });
    drive.files.get(
      { fileId: fileId, alt: 'media' },
      { responseType: 'stream' }
    ).then(res => {
      res.data
      .on('data', chunk => chunks.push(chunk))
      .on('end', () => {
        const fileBuffer = Buffer.concat(chunks);
        console.log(fileBuffer);
      })
      .on('error', err => reject(err));
    });
  });
  
} catch (error) {
  core.setFailed(error.message);
}

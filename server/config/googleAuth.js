const { google } = require('googleapis');


const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:4000/api/auth/google/callback' // Your callback URL
);

module.exports = oauth2Client;
//http://localhost:4000/api/auth/google/callback
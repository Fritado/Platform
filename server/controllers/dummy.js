const axios = require('axios');
const https = require('https');

async function sendArticle(articleID, articleContent, clientID) {
    const url = 'https://jhanvient.in/webhook.php';

    const payload = {
        ArticleID: articleID,
        ArticleContent: articleContent,
        ClientID: clientID
    };

    console.log('Sending article with payload:', payload);

    const agent = new https.Agent({ keepAlive: false });

    try {
        const response = await axios.post(url, payload, {
            timeout: 10000, // 10 seconds timeout
            httpsAgent: agent
        });
        console.log(`Status: ${response.status}`);
        console.log('Response:', response.data);
    } catch (error) {
        if (error.response) {
            console.error('Response error:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error:', error.message);
        }
    }
}

module.exports = sendArticle;




const express = require("express");
const router = express.Router();
const axios = require("axios");

const sendArticle = require('../controllers/dummy');

router.post('/sendArticle', async (req, res) => {
    const { articleID, articleContent, clientID } = req.body;

    try {
        await sendArticle(articleID, articleContent, clientID);
        res.status(200).json({
            success: true,
            message: 'Article sent successfully'
        });
    } catch (error) {
        console.error('Error while sending article:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send article'
        });
    }
});

module.exports = router;


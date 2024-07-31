const { google } = require("googleapis");
const oauth2Client = require("../config/googleAuth");
const socialMediaModel = require("../models/socialMediaModel");
const checkGoogleAnalyticsAuth = async (req, res, next) => {
    try {
      const tokenData = await GoogleAnalyticsData.findOne({ userId: req.user.id });
  
      if (!tokenData) {
        return res.status(400).send("Google Analytics not connected.");
      }
  
      oauth2Client.setCredentials(tokenData);
  
      if (oauth2Client.isTokenExpiring()) {
        const { credentials } = await oauth2Client.refreshAccessToken();
        tokenData.access_token = credentials.access_token;
        tokenData.expiry_date = credentials.expiry_date;
        await tokenData.save();
        oauth2Client.setCredentials(credentials);
      }
  
      req.oauth2Client = oauth2Client;
      next();
    } catch (error) {
      console.error("Error checking Google Analytics auth:", error);
      res.status(500).send("Internal Server Error");
    }
  };
  
  module.exports = checkGoogleAnalyticsAuth;
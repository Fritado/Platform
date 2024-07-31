// google auth Routes
const express = require('express');
const { googleAuth, googleAuthCallback } = require('../../controllers/SocialMedia/googleAnalytics');
const router = express.Router();
const {auth}  = require("../../middlewares/auth")
const checkGoogleAnalyticsAuth = require("../../middlewares/googleAnalytics")

router.get('/auth/google', googleAuth);
router.get('/auth/google/callback', googleAuthCallback );


// google analytics Routes
const { getAnalyticsData ,getAnalyticsInfoPage } = require('../../controllers/SocialMedia/googleAnalytics');


router.get("/analyticsInfo", checkGoogleAnalyticsAuth, getAnalyticsInfoPage);
router.post("/fetchAnalyticsData", checkGoogleAnalyticsAuth, getAnalyticsData);

module.exports = router;

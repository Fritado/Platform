// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const facebook = require("../../controllers/SocialMedia/facebook");

router.get("/facebook", facebook.facebookAuth);
router.get("/facebook/callback", facebook.facebookAuthCallback);

module.exports = router;

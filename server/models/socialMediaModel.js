const mongoose = require("mongoose");

const socialMediaTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  email: { type: String, },
  googleAnalytics_access_token: { type: String, required: true },
  googleAnalytics_refresh_token: { type: String, required: true },
  googleAnalytics_scope: { type: String },
  googleAnalytics_token_type: { type: String },
  googleAnalytics_expiry_date: { type: Number },
  propertyId: { type: String },
});

module.exports = mongoose.model("SocialMediaToken", socialMediaTokenSchema);

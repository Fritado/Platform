const express = require("express");
const router = express.Router();

const {
  saveWebsiteType,
  getWebsiteDetails,
  deleteWebsiteData,
  updateWebsiteConnectionStatus,
} = require("../controllers/ConnectWebsite/WebsiteType");
const { auth } = require("../middlewares/auth");

router.post("/save-website-type", auth, saveWebsiteType);
router.get("/fetch-website-details", auth, getWebsiteDetails);
router.delete("/website/:id", auth, deleteWebsiteData);
router.put("/websiteConnection-status", auth, updateWebsiteConnectionStatus);

module.exports = router;

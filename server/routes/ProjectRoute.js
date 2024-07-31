const express = require("express")
const router = express.Router();

const {saveProjectUrl ,getProjectUrl ,checkProjectUrlExist ,updateWebhookUrl} = require("../controllers/Projects/Project");
const { auth  } = require("../middlewares/auth");

router.post("/projectUrl" ,auth,saveProjectUrl)
router.get("/fetch-projectUrl" ,auth,getProjectUrl);
router.post("/check-ProjectUrl" ,auth ,  checkProjectUrlExist);
router.post("/update-webhook-url" , auth , updateWebhookUrl)

module.exports = router;
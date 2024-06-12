const express = require("express");
const router = express.Router();

const {deleteUserAndItsData} = require("../../controllers/SuperAdminController/userManager/UserManager");
router.delete("/delete-user" , deleteUserAndItsData)

module.exports = router;
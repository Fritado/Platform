const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  login,
  signup,
  sendOtp,
  changePassword,
  updateContactNumber,
  getUserDetails,
  getAllUsers
} = require("../controllers/Auth");
const { auth } = require("../middlewares/auth");
const {
  resetPassword,
  resetPasswordToken,
} = require("../controllers/ResetPassword");

//Auth
router.post("/login", login);
router.post("/signup", signup);
router.post("/send-otp", sendOtp);
router.post("/changepassword", auth, changePassword);
router.post("/reset-password-token-link", resetPasswordToken);
router.post("/reset-password", resetPassword);
router.post ('/update-user-profile' ,auth, updateContactNumber);
router.get("/fetch-user-details" , auth , getUserDetails);
router.get("/fetch-all-users-details" , getAllUsers);


module.exports = router;

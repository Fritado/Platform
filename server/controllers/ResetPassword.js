const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const {
  getPasswordResetEmailTemplate,
} = require("../mail/templates/resetPasswordTemplate");

const emailContent = require("../mail/emailContent");
const emailTemplate = require("../mail/templates/emailTemplate");

exports.resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    const {firstname , lastname , userId} = user;
   // console.log(firstname + lastname + userId , "name")
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
      });
    }

    const token = crypto.randomBytes(20).toString("hex");
    const expirationTime = Date.now() + 3600000; // 1 hour

    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: expirationTime,
      },
      { new: true }
    );

    //https://platform.fritado.com/reset-password/${token}
    //http://localhost:30001/reset-password/${token}

    const resetLink = `http://localhost:30001/reset-password/${token}`;

    const emailBody = emailTemplate(
      emailContent.resetPassword.title,
      emailContent.resetPassword.body(firstname,
        lastname,userId,resetLink)
    );

    try {
      await mailSender(email, emailContent.resetPassword.title, emailBody);
      //  console.log("Password reset email sent successfully to:", email);
      return res.status(200).json({
        success: true,
        message:
          "Email Sent Successfully, Please Check Your Email to Continue Further",
      });
    } catch (emailError) {
      console.log("Failed to send password reset email:", emailError.message);
      return res.status(500).json({
        success: false,
        message: "Failed to send password reset email",
      });
    }
  } catch (error) {
    console.log("Error in resetPasswordToken:", error);
    return res.status(500).json({
      error: error.message,
      success: false,
      message: `Some Error in Sending the Reset Message`,
    });
  }
};

exports.resetPassword = async (req, res) => {
  // console.log("reset password body", req.body);
  try {
    const { password, token } = req.body;

    const userDetails = await User.findOne({ token: token });
    const {firstname , lastname,userId} = userDetails;
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token is invalid or user not found",
      });
    }

    if (Date.now() > userDetails.resetPasswordExpires) {
      return res.status(403).json({
        success: false,
        message: `Token is Expired, Please Regenerate Your Token`,
      });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { token: token },
      { password: encryptedPassword },
      { new: true }
    );
    const emailBody = emailTemplate(
      emailContent.resetPasswordConfirmation.title,
      emailContent.resetPasswordConfirmation.body(firstname , lastname ,userId)
    );
    try {
      await mailSender(
        userDetails.email,
        emailContent.resetPasswordConfirmation.title,
        emailBody
      );
      console.log(
        "Password reset confirmation email sent successfully to:",
        userDetails.email
      );
    } catch (emailError) {
      console.log(
        "Failed to send password reset confirmation email:",
        emailError.message
      );
    }

    return res.json({
      success: true,
      message: `Password Reset Successfully`,
    });
  } catch (error) {
    console.log("Error in resetPassword:", error);
    return res.status(500).json({
      success: false,
      message: "Error while resetting the password",
    });
  }
};

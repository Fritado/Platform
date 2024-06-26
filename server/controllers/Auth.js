const User = require("../models/User");
const Otp = require("../models/OTP");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const crypto = require("crypto");
const emailContent = require("../mail/emailContent");
const mailSender = require("../utils/mailSender");
//console.log(mailSender);
const emailTemplate = require("../mail/templates/emailTemplate");
const BillingsPlan = require("../models/BillingsPlans/BillingPlan");

async function generateUniqueUserId() {
  let userId;
  let userExists;
  do {
    userId = crypto.randomInt(100000, 1000000).toString();
    userExists = await User.findOne({ userId });
  } while (userExists);
  return userId;
}
//// Send OTP For Email Verification (signuP time)
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const checkUserPresent = await User.findOne({ email });

    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message:
          "This email id is already in use. Please create a new account or retrieve your password.",
      });
    }

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    //check for unique otp in db
    const result = await Otp.findOne({ otp: otp });
    // console.log("Result is Generate OTP Func");
    // console.log("OTP", otp);
    // console.log("Result", result);

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await Otp.findOne({ otp: otp });
    }
    let otpEntry = await Otp.findOne({ email });
    if (otpEntry) {
      // Update the existing OTP entry
      otpEntry.otp = otp;
      await otpEntry.save();
    } else {
      // Create a new OTP entry
      const otpPayload = { email, otp };
      otpEntry = await Otp.create(otpPayload);
    }
    // console.log("OTP Body", otpEntry);

    const template = emailContent.sendOtp;
    await mailSender(
      email,
      template.title,
      emailTemplate(template.title, template.body(otp))
    );

    return res.status(200).json({
      success: true,
      message: `OTP Sent Successfully`,
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

//SignUp controller for registering users
exports.signup = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
      contactNumber,
      otp,
    } = req.body;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !confirmPassword ||
      !contactNumber
    ) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }
    if (contactNumber > 10 && contactNumber < 10) {
      return res.json({
        sucess: false,
        message: "Please enter a valid 10-digit mobile number.",
      });
    }
    if (!passwordRegex.test(password)) {
      return res.status(401).json({
        success: false,
        message:
          "Password should be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character.",
      });
    }
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Passwords do not match. Please re-enter the same password in both fields and try again.",
      });
    }

    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "A user with this email address already exists. Please log in or reset your password.",
      });
    }
    //Find the most recent OTP for the email
    const response = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1);
    // console.log("opt res", response);
    if (response.length === 0) {
      // OTP not found for the email
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    } else if (otp !== response[0].otp) {
      // Invalid OTP
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const uniqueUserId = await generateUniqueUserId();
    const freeTrialEndDate = new Date(Date.now() + 6 * 24 * 60 * 60 * 1000);
    const defaultRole = "user";

    //Create the user
    const newUser = await User.create({
      userId: uniqueUserId,
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role: defaultRole,
      contactNumber,
      termsAccepted: true,
    });

    // Create the billing plan entry
    const newBillingPlan = await BillingsPlan.create({
      user: newUser._id,
      freeTrialEndDate: freeTrialEndDate,
      paymentDueDate: freeTrialEndDate, // Initial payment due date is the end of the free trial
      paymentStatus: false, // Initial payment status is unpaid
    });

    const welcomeEmail = emailContent.welcomeEmail;
    const emailBodyContent = welcomeEmail.body(
      firstname,
      lastname,
      uniqueUserId
    );
    const emailBody = emailTemplate(welcomeEmail.title, emailBodyContent);
    try {
      await mailSender(email, welcomeEmail.title, emailBody);
      //console.log("Welcome email sent successfully to:", email);
    } catch (emailError) {
      console.log("Failed to send welcome email:", emailError.message);
    }

    return res.status(200).json({
      success: true,
      newUser,
      newBillingPlan,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "User cannot be registered. Please try again.",
    });
  }
};

// Login controller for authenticating users
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required , please fill all details",
      });
    }

    const user = await User.findOne({ email });
    // console.log(user)

    if (!user) {
      return res.status(401).json({
        success: false,
        message: `This user is not registered with us. Please create an account and try again.`,
      });
    }

    //generate JWT token and comapre password
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      user.token = token;
      //user.password = undefined
      let redirectTo = "/dashboard";
      if (user.role === "superAdmin") {
        redirectTo = "/admin-dashboard";
      } else if (!user.hasLoggedInBefore) {
        redirectTo = user.lastVisited;
        user.hasLoggedInBefore = true;
      }

      await user.save();

      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options);

      return res.status(200).json({
        success: true,
        token,
        user,
        id: user._id,
        role: user.role,
        message: `User login successfully.`,
        redirectTo,
      });
    } else {
      //incorrect passowrd
      return res.status(401).json({
        success: false,
        message: `Invalid username or password. Please enter valid credentials or contact support for assistance with account recovery.`,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    });
  }
};

//changePassword
exports.changePassword = async (req, res) => {
  try {
    //get user data from req.user
    const userDetails = await User.findById(req.user.id);

    //get old passowrd  new password
    const { oldPassword, newPassword } = req.body;

    //validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );

    // If old password does not match, return a 401 (Unauthorized) error
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" });
    }

    //update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDeatils = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );

    //send notification email
    try {
      const emailResponse = await mailSender(
        updatedUserDeatils.email,
        "Password for your account has been updated",
        passwordUpdated(
          updatedUserDeatils.email,
          `Password updated successfully for ${updatedUserDeatils.firstname} ${updatedUserDeatils.lastname}`
        )
      );
      console.log("Email sent successfully:", emailResponse.response);
    } catch (err) {
      console.log("Error occurred while sending email:", err);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: err.message,
      });
    }
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};

exports.updateContactNumber = async (req, res) => {
  try {
    const { contactNumber } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user's contact number
    user.contactNumber = contactNumber;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Contact number updated successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error while updating contact number" });
  }
};
//use this (getUserDetails) to get the progress update of page
exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    // Validate user ID
    if (!userId) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    //   to fetch these details only
    // const user = await User.findById(userId).select(
    //   "firstname lastname email contactNumber"
    // );
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      user,
      message: "User details fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error while fetching user details" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: 'billingplans', // Collection name for BillingPlans
          localField: '_id',
          foreignField: 'user',
          as: 'billingAndPlans',
        },
      },
    ]);

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }
    return res.status(200).json({
      success: true,
      users,
      message: "Users retrieved successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Cannot fetch users. Please try again.",
    });
  }
};

// progress update before reach to dashboard
exports.updateProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { lastVisited, stepsCompleted } = req.body;
    const user = await User.findById(userId);
    if (user) {
      user.lastVisited = lastVisited;
      user.stepsCompleted = stepsCompleted;
      await user.save();
      return res
        .status(200)
        .json({ success: true, message: "Progress updated." });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error updating progress." });
  }
};

//update the package
exports.updateUserPlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const { packageName } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found please signup first",
      });
    }
    user.Plan = packageName;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Plan updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to update user plan",
    });
  }
};

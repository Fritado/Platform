const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth
exports.auth = async (req, res, next) => {
  try {
    //console.log("Request Object:", req);
    // console.log("BEFORE ToKEN EXTRACTION");
    //extract token

    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    //const token = req.cookies.token;
    /// console.log("AFTER ToKEN EXTRACTION");

    //if token missing, then return response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "TOken is missing",
      });
    }

    //verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      //console.log(decode);
      req.user = decode;
    } catch (err) {
      //verification - issue
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

exports.checkPaymentAndRedirect = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    console.log("user Details", user);

    if (!user) {
      return res.redirect("/login");
    }
    if (!user.isPaymentCompleted) {
      return res.redirect("/payment");
    }
    //If payment is not completed, redirect to last visited page
    if (!user.isPaymentCompleted) {
      const lastVisitedPage = user.lastVisitedPage || "/dashboard";
      return res.redirect(lastVisitedPage);
    }

    // If payment is completed, redirect to dashboard
    return res.redirect("/dashboard");

   // next();
  } catch (error) {
    console.error("Error while checking payment status", error);
    return res.status(500).send("Internal Server Error");
  }
};

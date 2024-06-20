const BusinessProfile = require("../../models/BusinessProfileModels/BusinessProfile");
const User = require("../../models/User");

// Function to extract user ID from localStorage value
const getUserIdFromLocalStorage = (localStorageValue) => {
  try {
    const userObject = JSON.parse(localStorageValue);
    console.log(userObject._id);
    return userObject._id;
  } catch (error) {
    console.error("Error parsing localStorage value:", error);
    return null;
  }
};

const saveBusinessProfile = async (req, res) => {
  try {
    const { aboutBusiness } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const cleanedAboutBusiness = aboutBusiness.trim().replace(/\s+/g, ' ');

    const existingBusinessProfile = await BusinessProfile.findOneAndUpdate(
      { user: userId },
      { aboutBusiness: cleanedAboutBusiness },
      { new: true, upsert: true }
    );

    return res
      .status(200)
      .json({
        success: true,
        message: "Business Profile Data saved successfully",
        data: existingBusinessProfile,
      });
  } catch (error) {
    console.error("Error while saving Business Profile:", error);
    res.status(500).json({ message: "Failed to save Business Profile" });
  }
};

// Update Business Profile
const updateBusinessProfile = async (req, res) => {
  try {
    const { companyName, aboutBusiness } = req.body;
    const userId = req.user.id;

    // Find the business profile for the user
    let existingBusinessProfile = await BusinessProfile.findOne({
      user: userId,
    });

    if (!existingBusinessProfile) {
      // If the business profile doesn't exist, create a new one
      const newBusinessProfile = new BusinessProfile({
        aboutBusiness,
        companyName,
        user: userId,
      });
      await newBusinessProfile.save();

      return res.status(200).json({
        success: true,
        message: "Business Profile Data saved successfully",
        data: newBusinessProfile,
      });
    }

    // Update the existing business profile

    if (companyName) {
      existingBusinessProfile.companyName = companyName;
    }
    if (aboutBusiness) {
      const cleanedAboutBusiness = aboutBusiness.trim().replace(/\s+/g, ' ');
      existingBusinessProfile.aboutBusiness = aboutBusiness;
    }

    // Save the updated business profile
    await existingBusinessProfile.save();

    return res.status(200).json({
      success: true,
      message: "Business Profile Data updated successfully",
      data: existingBusinessProfile,
    });
  } catch (error) {
    console.error("Error while updating Business Profile:", error);
    res.status(500).json({ message: "Failed to update Business Profile" });
  }
};

// Get Business Profile Data
const getBusinessProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the business profile for the user
    const existingBusinessProfile = await BusinessProfile.findOne({
      user: userId,
    });

    if (!existingBusinessProfile) {
      return res.status(404).json({
        success: false,
        message: "Business Profile not found. Please create a profile first.",
      });
    }

    // Extract the required data
    const { aboutBusiness, companyName, industryType } =
      existingBusinessProfile;

    return res.status(200).json({
      success: true,
      message: "Business Profile Data retrieved successfully",
      data: { aboutBusiness, companyName, industryType },
    });
  } catch (error) {
    console.error("Error while retrieving Business Profile:", error);
    res.status(500).json({ message: "Failed to retrieve Business Profile" });
  }
};

const saveCompanyAndIndustry = async (req, res) => {
  try {
    const { companyName, industryType } = req.body;
    const userId = req.user.id;

    let existingBusinessInfo = await BusinessProfile.findOne({ user: userId });
    if (!existingBusinessInfo) {
      // If the business profile doesn't exist, create a new one with provided companyName and industryType
      const newBusinessProfile = new BusinessProfile({
        companyName,
        industryType,
        user: userId,
      });
      await newBusinessProfile.save();
      return res.status(200).json({
        success: true,
        message: "Business Profile Data saved successfully",
        data: newBusinessProfile,
      });
    }
    // Check if companyName and industryType are not already present, then add them
    if (!existingBusinessInfo.companyName && companyName) {
      existingBusinessInfo.companyName = companyName;
    }
    if (!existingBusinessInfo.industryType && industryType) {
      existingBusinessInfo.industryType = industryType;
    }

    await existingBusinessInfo.save();

    return res.status(200).json({
      success: true,
      message: "Company Name and Industry Type saved successfully",
      data: existingBusinessInfo,
    });
  } catch (error) {
    console.error("Error while saving Company Name and Industry Type:", error);
    res
      .status(500)
      .json({ message: "Failed to save Company Name and Industry Type" });
  }
};

// Update Company Name and Industry Type
const updateCompanyAndIndustry = async (req, res) => {
  try {
    const { industryType } = req.body;
    const userId = req.user.id;

    // Find the business profile for the user
    let existingBusinessProfile = await BusinessProfile.findOne({
      user: userId,
    });

    if (!existingBusinessProfile) {
      return res.status(404).json({
        success: false,
        message: "Business profile not found for this user",
      });
    }

    // Update companyName and industryType if provided in the request body

    if (industryType !== undefined) {
      existingBusinessProfile.industryType = industryType;
    }

    // Save the updated business profile
    await existingBusinessProfile.save();

    return res.status(200).json({
      success: true,
      message: " Industry Type updated successfully",
      data: existingBusinessProfile,
    });
  } catch (error) {
    console.error(
      "Error while updating Company Name and Industry Type:",
      error
    );
    res
      .status(500)
      .json({ message: "Failed to update Company Name and Industry Type" });
  }
};

module.exports = {
  saveBusinessProfile,
  updateBusinessProfile,
  getBusinessProfile,
  saveCompanyAndIndustry,
  updateCompanyAndIndustry,
};

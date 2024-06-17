const User = require("../../models/User");
const Keyword = require("../../models/BusinessProfileModels/Keywords");

const saveKeyword = async (req, res) => {
  try {
    const { keywords } = req.body;

    // Check if the user exists
    const userId = await User.findById(req.user.id);
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Sorry! User not found",
      });
    }

    // Validate and prepare keywords
    let keywordsArray = [];
    if (typeof keywords === "string") {
      keywordsArray = keywords.split("\n").map((keyword) => keyword.trim())
      .filter(keyword => keyword !== "");
    } else if (Array.isArray(keywords)) {
      keywordsArray = keywords.map((keyword) => keyword.trim()).filter(keyword => keyword !== "");
    } else {
      throw new Error("Keywords must be a string or an array");
    }

    // Find existing keyword document for the user
    let userKeyword = await Keyword.findOne({ user: userId });

    if (!userKeyword) {
      // If no existing document, create a new one
      userKeyword = new Keyword({
        keywords: keywordsArray,
        user: userId,
      });
    } else {
      // If the document exists, append the new keywords to the existing array
      keywordsArray.forEach((newKeyword) => {
        if (!userKeyword.keywords.includes(newKeyword)) {
          userKeyword.keywords.push(newKeyword);
        }
      });
    }

    await userKeyword.save();

    return res.status(200).json({
      success: true,
      message: "Keywords saved successfully",
      data: userKeyword,
    });
  } catch (error) {
    console.error("Error while saving keywords:", error);
    res.status(500).json({ message: "Failed to save keywords" });
  }
};

const updateKeyword = async (req, res) => {
  try {
    const { keywords } = req.body;

    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find the existing keyword for the user
    let existingKeyword = await Keyword.findOne({
      user: userId,
    });

    if (!existingKeyword) {
      return res.status(404).json({
        success: false,
        message: "Keyword not found for this user",
      });
    }

    // Update the keyword data
    if (keywords) {
      existingKeyword.keywords = keywords;
    }

    await existingKeyword.save();

    return res.status(200).json({
      success: true,
      message: "Keyword updated successfully",
      data: existingKeyword,
    });
  } catch (error) {
    console.error("Error while updating keyword data", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getKeywords = async (req, res) => {
  try {
    const userId = req.user.id;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find the keyword data for the user
    const userKeywords = await Keyword.findOne({
      user: userId,
    });

    if (!userKeywords) {
      return res.status(404).json({
        success: false,
        message: "Keywords not found for this user",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Keywords retrieved successfully",
      data: userKeywords,
    });
  } catch (error) {
    console.error("Error while retrieving keywords", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteKeyWord = async (req, res) => {
  try {
    const { keywordToDelete } = req.body;

    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let existingKeyword = await Keyword.findOne({
      user: userId,
    });

    if (!existingKeyword) {
      return res.status(404).json({
        success: false,
        message: "Keyword not found for this user",
      });
    }
    // Parse the keywords string and split into individual keywords
    let allKeywords = existingKeyword.keywords[0].split("\n");
    allKeywords = allKeywords.filter(Boolean);
    let updatedKeywords = [];

    // Find and remove the keyword to delete
    for (let i = 0; i < allKeywords.length; i++) {
      const keyword = allKeywords[i].replace(/^\d+\.\s*/, "");
      if (keyword !== keywordToDelete) {
        updatedKeywords.push(allKeywords[i]);
      }
    }
    existingKeyword.keywords = [updatedKeywords.join("\n")];
    await existingKeyword.save();

    return res.status(200).json({
      success: true,
      message: "Keyword deleted successfully",
      data: existingKeyword,
    });
  } catch (error) {
    console.error("Error while deleting keyword:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateSingleKeyword = async (req, res) => {
  try {
    const { oldKeyword, newKeyword } = req.body;
    const userId = req.user.id;

    const existingKeyword = await Keyword.findOne({ user: userId });
    if (!existingKeyword) {
      return res.status(404).json({
        success: false,
        message: "Keyword not found for this user",
      });
    }

    // Parse the keywords string and split into individual keywords
    let allKeywords = existingKeyword.keywords[0].split("\n");
    allKeywords = allKeywords.filter(Boolean); // Remove empty strings

    // Find and update the old keyword with the new one
    const updatedKeywords = allKeywords.map((keyword) => {
      if (keyword.replace(/^\d+\.\s*/, "") === oldKeyword) {
        return `${keyword.split(".")[0]}. ${newKeyword}`;
      }
      return keyword;
    });

    existingKeyword.keywords = [updatedKeywords.join("\n")];
    await existingKeyword.save();

    return res.status(200).json({
      success: true,
      message: "Keyword updated successfully",
      data: existingKeyword,
    });
  } catch (error) {
    console.error("Error while updating keyword:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const createSingleKeyword = async (req, res) => {
  try {
    const { newKeyword } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let existingKeyword = await Keyword.findOne({ user: userId });

    if (!existingKeyword) {
      // If no existing document, create a new one with the single keyword
      existingKeyword = new Keyword({
        keywords: [newKeyword],
        user: userId,
      });
    } else {
      // Parse the existing keywords
      if (!existingKeyword.keywords) {
        existingKeyword.keywords = []; // Initialize keywords array if not already present
      }
      existingKeyword.keywords[0] += `\n ${newKeyword}`;
      // allKeywords = allKeywords.filter(Boolean);
      // if (allKeywords.includes(newKeyword)) {
      //   return res.status(400).json({
      //     success: false,
      //     message: "Keyword already exists for this user",
      //   });
      // }
      // // Add the new keyword
      // allKeywords.push(newKeyword);
      // existingKeyword.keywords = [allKeywords.join("\n")];
    }
    await existingKeyword.save();

    return res.status(200).json({
      success: true,
      message: "Keyword created successfully",
      data: existingKeyword,
    });
  } catch (error) {
    console.error("Error while creating keyword:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  saveKeyword,
  getKeywords,
  updateKeyword,
  deleteKeyWord,
  updateSingleKeyword,
  createSingleKeyword,
};

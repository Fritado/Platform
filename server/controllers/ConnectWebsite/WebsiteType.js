const User = require("../../models/User");
const Project = require("../../models/Projects");
const WebsiteType = require("../../models/ConnectWebsite/WebsiteType");

exports.saveWebsiteType = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    const project = await Project.findOne({ user: userId });
    const { webType, technology } = req.body;

    if (!user) {
      return res.json({
        success: false,
        message: "User not exist",
      });
    }
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project does not exist for this user",
      });
    }
    const { domainUrl } = project;
    if (!domainUrl || domainUrl.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Project does not have a valid domain URL",
      });
    }

    const filter = { user: userId, projectName: domainUrl[0] };
    const update = { webType, technology };
    const options = { new: true, upsert: true, setDefaultsOnInsert: true };
    const updatedWebsiteType = await WebsiteType.findOneAndUpdate(
      filter,
      update,
      options
    );

    return res.status(201).json({
      success: true,
      message: "Website type saved successfully",
      data: updatedWebsiteType,
    });
  } catch (error) {
    console.error(
      "Errow while saving user's website type in backend side",
      error
    );
    return res.status(500).json({
      succes: false,
      message: "Internal server error",
    });
  }
};

exports.getWebsiteDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.json({
        success: false,
        message: "User not exist",
      });
    }
    const websiteDetails = await WebsiteType.find({ user: userId });

    return res.status(200).json({
      success: true,
      message: "website details fetched successfully",
      data: websiteDetails,
    });
  } catch (error) {
    console.log(error, "Error while fetchig website details from db ");
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.deleteWebsiteData = async (req, res) => {
  try {
    const userId = req.user.id;
    const websiteTypeId = req.params.id; // Assuming you pass the website type ID as a route parameter

    // Find the WebsiteType document for the logged-in user and the specified ID
    const websiteType = await WebsiteType.findOneAndDelete({
      _id: websiteTypeId,
      user: userId,
    });

    if (!websiteType) {
      return res.status(404).json({
        success: false,
        message: "Website type not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Website type deleted successfully",
      data: websiteType,
    });
  } catch (error) {
    console.error("Error while deleting website type for the user", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

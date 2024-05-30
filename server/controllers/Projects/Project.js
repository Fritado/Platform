const Project = require("../../models/Projects");
const User = require("../../models/User");

// Function to generate a unique webhook URL for each user
const generateWebhookUrl = (domain) => {
  return `${domain}/fritado/webhook`;
};
exports.saveProjectUrl = async (req, res) => {
  try {
    const { projectUrl } = req.body;

    const userId = await User.findById(req.user.id);
    //console.log("userId" , userId);

    if (!userId) {
      return res.status({
        success: false,
        message: "Sorry! User not found",
      });
    }

    // Validate input data
    if (!projectUrl) {
      return res.status(400).json({ error: "Project URL is required." });
    }

    // Check if a project already exists for the user
    const existingProject = await Project.findOne({ user: userId });

    // Check if the project URL already exists for any user
    const existingProjectUrl = await Project.findOne({ domainUrl: projectUrl });

    if (existingProjectUrl) {
      // If it already exists, return a response indicating that it's a duplicate
      return res.status(400).json({ error: "Duplicate project URL." });
    }
    if (existingProject) {
      // Check if the project URL already exists in the array
      if (!existingProject.domainUrl.includes(projectUrl)) {
        // If it doesn't exist, add the new URL to the array
        existingProject.domainUrl.push(projectUrl);
        await existingProject.save();
      } else {
        // If it already exists, return a response indicating that it's a duplicate
        return res.status(400).json({
          error:
            "project Url for this user is already exist! Duplicate project URL.",
        });
      }
    } else {
      const webhookUrl = generateWebhookUrl(projectUrl);
      const newProject = new Project({
        domainUrl: projectUrl,
        webhookUrl: webhookUrl,
        user: userId,
      });
      await newProject.save();
    }
    return res.status(200).json({
      success: true,
      message: "Project URL saved successfully.",
     // webhookUrl
    });
  } catch (error) {
    console.log("Error while saving Project URL into database", error);
    console.error(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getProjectUrl = async (req, res) => {
  try {
    //find the user by Id
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // Find projects associated with the user
    const projects = await Project.find({ user: userId });

    // Extract and return project URLs
    const projectUrls = projects.map((project) => project.domainUrl);

    return res.status(200).json({
      success: true,
      message: "Project Url response is coming",
      data: projectUrls,
    });
  } catch (error) {
    console.log("Error while retrieving project URLs from the database", error);
    console.error(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.checkProjectUrlExist = async (req, res) => {
  try {
    const { projectUrl } = req.body;

    const existingProjectUrl = await Project.findOne({ domainUrl: projectUrl });

    // Send response indicating whether the projectUrl exists or not
    res.json({ exists: !!existingProjectUrl });
  } catch (error) {
    console.error("Error while checking projectUrl existence:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

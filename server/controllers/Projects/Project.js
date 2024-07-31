const Project = require("../../models/Projects");
const User = require("../../models/User");

// Function to generate a unique webhook URL for each user
const generateWebhookUrl = (domain) => {
  return `${domain}/fritado`;
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
      return res.status(400).json({
        error: "Duplicate project URL! Project is already exist in database",
      });
    }
    if (existingProject) {
      // Update the existing project with the new URL
      existingProject.domainUrl = projectUrl;
      existingProject.webhookUrl = generateWebhookUrl(projectUrl);
      await existingProject.save();
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
    return res.status(500).json({ error: "Internal Server Error in saving project url" });
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
    const projectDetails = projects.map((project) => ({
      webhookUrl: project.webhookUrl,
    }));

    return res.status(200).json({
      success: true,
      message: "Project Url response is coming",
      data: projectUrls,
      projectDetails: projectDetails,
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


exports.updateWebhookUrl = async (req, res) => {
  try {
    const { webhookUrl, domainName } = req.body;
    const userId = req.user.id;

    if (!webhookUrl || !domainName) {
      return res.status(400).json({ error: "Webhook URL and domain name are required." });
    }

    const existingProject = await Project.findOne({ user: userId, domainUrl: domainName });

    if (existingProject) {
      existingProject.webhookUrl = webhookUrl;
      await existingProject.save();
      return res.status(200).json({
        success: true,
        message: "Webhook URL updated successfully.",
        webhookUrl,
      });
    } else {
      return res.status(404).json({ error: "Project not found for the user and domain name." });
    }
  } catch (error) {
    console.error("Error while updating Webhook URL in the database", error);
    return res.status(500).json({ error: "Internal Server Error in updating webhook URL." });
  }
};
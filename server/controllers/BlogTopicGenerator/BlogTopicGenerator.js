const BlogTopic = require("../../models/Blogs/BlogTopic");
const User = require("../../models/User");
const Projects = require("../../models/Projects");

//projects find kro iss userid se in project database , then find pid of that project
exports.saveBlogTopic = async (req, res) => {
  try {
    const { apiResponse } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const ProjectDetails = await Projects.findOne({ user: userId }).exec();

    if (!ProjectDetails) {
      return res.status(404).json({
        success: false,
        message: "Project details not found",
      });
    }

    const projectId = ProjectDetails._id;

    // Check if the apiResponse is an array and not empty
    if (!Array.isArray(apiResponse) || apiResponse.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or empty apiResponse",
      });
    }

    // Check if a BlogTopic document already exists for the user
    // let blogTopic = await BlogTopic.findOne({ user: userId });

    // if (blogTopic) {
    //   // Update the existing BlogTopic document
    //   blogTopic.topics = apiResponse;
    //   await blogTopic.save();
    // } else {
    //   // Create a new BlogTopic instance
    //   blogTopic = new BlogTopic({
    //     topics: apiResponse,
    //     user: user._id,
    //     PId: projectId,
    //   });
    //   await blogTopic.save();
    // }

    let blogTopic = await BlogTopic.findOne({ user: userId });

    if (blogTopic) {
      // If blogTopic exists, update the topics array with unique values
      const uniqueTopics = new Set([...blogTopic.topics, ...apiResponse]);
      blogTopic.topics = Array.from(uniqueTopics); // Convert Set back to array
      await blogTopic.save();
    } else {
      // Create a new BlogTopic instance if it doesn't exist
      blogTopic = new BlogTopic({
        topics: apiResponse,
        user: user._id,
        PId: projectId,
      });
      await blogTopic.save();
    }
    return res.status(200).json({
      success: true,
      message: "Blog Topic saved successfully",
    });
  } catch (error) {
    console.error("Error saving apiResponse:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.getBlogTopics = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const userBlogTopics = await BlogTopic.findOne({
      user: userId,
    });

    if (!userBlogTopics) {
      return res.status(404).json({
        success: false,
        message: "Blog Topics not found for this user",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Blog Topics retrieved successfully",
      data: userBlogTopics,
    });
  } catch (error) {
    console.error("Error fetching BlogTopics:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

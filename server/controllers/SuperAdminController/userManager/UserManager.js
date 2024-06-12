const User = require("../../../models/User");
const Project = require("../../../models/Projects");
const BlogTopic = require("../../../models/Blogs/BlogTopic");
const BlogDetails = require("../../../models/Blogs/BlogDetails");
const BlogSchedule = require("../../../models/Blogs/BlogSchedule");
const WebsiteType = require("../../../models/ConnectWebsite/WebsiteType");
const BusinessProfile = require("../../../models/BusinessProfileModels/BusinessProfile");
const Keywords = require("../../../models/BusinessProfileModels/Keywords");
const Location = require("../../../models/BusinessProfileModels/Location");
const ProductService = require("../../../models/BusinessProfileModels/ProductAndServices");

// //Apply delete functionality on user
// // delete user and all data associated with that particular user
exports.deleteUserAndItsData = async (req, res) => {
  try {
    const {userId}= req.body;
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
      
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Project.deleteMany({ user: userId });
    await BlogTopic.deleteMany({ user: userId });
    await BlogDetails.deleteMany({ user: userId });
    await BlogSchedule.deleteMany({ user: userId });
    await WebsiteType.deleteMany({ user: userId });
    await BusinessProfile.deleteMany({ user: userId });
    await Keywords.deleteMany({ user: userId });
    await Location.deleteMany({ user: userId });
    await ProductService.deleteMany({ user: userId });

    return res
      .status(200)
      .json({ message: "User and associated data deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

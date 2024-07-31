const cron = require("node-cron");
const axios = require("axios");
const User = require("../../models/User");
const BlogDetails = require("../../models/Blogs/BlogDetails");
const { getWebsiteDetails } = require("../ConnectWebsite/WebsiteType");

const getBlogById = async (blogId) => {
  try {
    const blog = await BlogDetails.findById(blogId);
    if (!blog) {
      throw new Error("Blog not found");
    }
    return blog;
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    throw error;
  }
};
const sendBlogToWordPress = async (blog, wordpressUrl) => {
  const data = new URLSearchParams();
  data.append("title", blog.topic);
  data.append("article", blog.blogDescription);
  data.append("status", "publish"); // Or 'draft' based on your logic
  data.append("publishDate", new Date(blog.PublishDate).toISOString());
  if (blog.approvedDate) {
    data.append("approvedDate", blog.approvedDate);
  }

  try {
    const response = await axios.post(wordpressUrl, data.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    //console.log("Blog sent to WordPress:", response.data);
    return response.status(200).json({
      success: true,
      message: "Blog post success",
    });
  } catch (error) {
    console.log("Error sending blog to WordPress:", error);
  }
};

exports.executeWorkflow = async (blogId, wordpressUrl) => {
  // const recentBlog = dummyBlog;
  // await sendBlogToWordPress(recentBlog, wordpressUrl);
  try {
    if (!blogId) {
      console.error("Blog ID is required");
      return;
    }
    // const userId = req.user.id;
    // const user = await User.findById(userId);
    // if (!user) {
    //   return res.json({
    //     success: false,
    //     message: "User not exist",
    //   });
    // }
    const blog = await getBlogById(blogId);

    if (!blog) {
      console.error("Blog not found");
      return { success: false, message: "Blog not found" };
    }

    if (blog.status !== "approved") {
      console.error("Blog is not approved.");
      return { success: false, message: "Blog is not approved" };
    }
    // const websiteDetails = await getWebsiteDetails(userId);
    // if (websiteDetails.websiteConnection !== "Active") {
    //   console.error("Website connection is not active.");
    //   return;
    // }
    await sendBlogToWordPress(blog, wordpressUrl);
    return { success: true, message: "Blog sent to WordPress successfully" };
  } catch (error) {
    console.error("Error executing workflow:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Schedule the task to run every day at a specific time (e.g., 2 AM)
// cron.schedule('*/5 * * * *', () => {
//   console.log('Running cron job to send blog data to WordPress...');
//   executeWorkflow('userIdHere', 'https://example.com/wp-admin/admin-post.php?action=fritadoai_submit_article');
// });
// const dummyBlog = {
//   topic: "New blog topi is sending by fritadoI",
//   blogDescription: "Thank you so much fo your time. Have a nice day",
//   PublishDate: new Date(),
//   approvedDate: new Date(),
// };

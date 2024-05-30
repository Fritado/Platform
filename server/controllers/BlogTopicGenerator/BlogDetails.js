const User = require("../../models/User");
const BlogDetails = require("../../models/Blogs/BlogDetails");
const Projects = require("../../models/Projects");
const BlogTopic = require("../../models/Blogs/BlogTopic");
const BlogSchedule = require("../../models/Blogs/BlogSchedule");
const moment = require("moment");
const cron = require("node-cron");
const axios = require("axios");
const https = require("https");

exports.saveBlogs = async (req, res) => {
  try {
    const { topic, blogDescription } = req.body;
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

    // Check if this is the first blog of the user
    //const isFirstBlog = !(await BlogDetails.exists({ user: userId }));
    const lastBlog = await BlogDetails.findOne({ user: userId })
      .sort({ PublishDate: -1 })
      .exec();
    let publishDate;

    if (lastBlog) {
      // If there are previous blogs, set publish date as the last blog's publish date plus 2 days
      publishDate = moment(lastBlog.PublishDate).add(2, "days").toDate();
    } else {
      // If it's the first blog, set publish date as user's signup date plus 5 days
      publishDate = moment(user.createdAt).add(5, "days").toDate();
    }

    const Blogs = new BlogDetails({
      topic: topic,
      blogDescription: blogDescription,
      user: user._id,
      PId: projectId,
      PublishDate: publishDate, // Set the calculated publish date
    });
    const newBlog = await Blogs.save();

    return res.status(200).json({
      success: true,
      message: "Blogs saved in database successfully",
      data: newBlog,
    });
  } catch (error) {
    console.log("Internal server error, can't save blog", error);
    return res.status(500).json({
      success: false,
      message: "Error in saving Blogs",
      error: error.message, // Send error message for debugging
    });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    // console.log("user", user)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const ProjectDetails = await Projects.findOne({ user: userId }).exec();
    const projectId = ProjectDetails._id;
    // console.log("projectId" , projectId);

    const projectAllBlogs = await BlogDetails.find({
      PId: projectId,
    });
    if (!projectAllBlogs) {
      return res.status(404).json({
        success: false,
        message: "Blog Details not found for this user",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Blog  Details retrieved successfully",
      data: projectAllBlogs,
    });
  } catch (error) {
    console.error(
      "Error While fetching all blogs of this user:",
      error.message
    );
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.checkBlogsAvailability = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // Step 1: Fetch all PIds from BlogTopic for the user
    const distinctPIds = await BlogTopic.distinct("PId", { user: userId });
    // console.log("distinctPIds", distinctPIds);

    const missingTopics = [];

    // Step 2 & 3: Iterate through each PId and check if corresponding blogs exist
    for (const pid of distinctPIds) {
      // Find the document in BlogTopic collection for the current PId
      const blogTopicDoc = await BlogTopic.findOne({ PId: pid });
      // console.log(" blogTopicDoc ", blogTopicDoc);
      // Check if blogTopicDoc exists
      if (blogTopicDoc) {
        const topics = blogTopicDoc.topics.map((topic) => topic.toLowerCase());

        // Fetch all blogs related to the current PId from BlogDetails
        const blogsFromBlogDetails = await BlogDetails.find({
          PId: pid,
        }).select("topic");

        // Check if each topic has a corresponding blog
        for (const topic of topics) {
          const blogExists = blogsFromBlogDetails.some(
            (blog) => blog.topic && blog.topic.toLowerCase() === topic
          );
          if (!blogExists) {
            missingTopics.push(topic);
          }
        }
      } else {
        // Handle case where no BlogTopic document is found for the current PId
        console.error("No BlogTopic document found for PId:", pid);
      }
    }

    // Step 4: Return missing topics
    if (missingTopics.length === 0) {
      return res.status(200).json({
        success: true,
        message: "All blog topics have corresponding blogs in the database",
      });
    } else {
      return res.json({
        success: false,
        message:
          "Some blog topics do not have corresponding blogs in the Blog Details database",
        missingTopics: missingTopics,
      });
    }
  } catch (error) {
    console.error("Error while checking blog availability:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.getEachSingleBlogs = async (req, res) => {
  try {
    const userId = req.user.id;
    const { topic } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const projectDetails = await Projects.findOne({ user: userId }).exec();
    if (!projectDetails) {
      return res.status(404).json({
        success: false,
        message: "Project details not found for this user",
      });
    }

    const projectId = projectDetails._id;

    // Fetch blog description by topic from the database
    const blog = await BlogDetails.findOne(
      {
        PId: projectId,
        topic: topic,
      },
      { blogDescription: 1, blogId: 1 }
    );

    if (!blog || !blog.blogDescription) {
      return res.status(404).json({
        success: false,
        message: "No blog found for this topic",
      });
    }

    // console.log("Blog description:", blog.blogDescription);

    return res.status(200).json({
      success: true,
      message: "Blog retrieved successfully by topic",
      blogId: blog._id,
      data: blog.blogDescription,
    });
  } catch (error) {
    console.error("error while fetching blog detail of this topic", error);
    return res.status(500).json({
      success: false,
      message: "Internal server Error",
    });
  }
};

exports.updateBlogDescription = async (req, res) => {
  try {
    const { blogId, blogDescription } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const blog = await BlogDetails.findOne({
      _id: blogId,
      user: userId,
    }).exec();
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    blog.blogDescription = blogDescription;
    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Blog description updated successfully",
      data: blog,
    });
  } catch (error) {
    console.log("Internal server error, can't update blog description", error);
    return res.status(500).json({
      success: false,
      message: "Error in updating blog description",
    });
  }
};

exports.approveBlog = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await BlogDetails.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (blog.status !== "approved") {
      blog.status = "approved";
      blog.approvedDate = new Date();
      await blog.save();

      return res.status(200).json({
        success: true,
        message: "Blog approved successfully",
        data: blog,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Blog is already approved",
      });
    }
  } catch (error) {
    console.error("Error while approving blog:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getBlogStatusByTopic = async (req, res) => {
  try {
    const { topic } = req.params;

    const blog = await BlogDetails.findOne({ topic });

    if (!blog || blog.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No blogs found for the specified topic",
      });
    }
    const extractDate = (timestamp) => {
      const dateObj = new Date(timestamp);
      if (isNaN(dateObj.getTime())) {
        return "-------";
      }
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    return res.status(200).json({
      success: true,
      message: "Blog status fetched successfully",
      data: {
        blogId: blog._id,
        blogTopic: blog.topic,
        status: blog.status,
        approvedDate: extractDate(blog.approvedDate),
        publishDate: extractDate(blog.PublishDate),
      },
    });
  } catch (error) {
    console.error("Error while fetching blog status:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getRecentBlogPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to the beginning of the day

    // Fetch recent blog post
    const recentBlog = await BlogDetails.findOne({
      user: userId,
      PublishDate: { $gte: today },
    })
      .sort({ PublishDate: 1 }) // Ascending order
      .limit(1);

    // Fetch upcoming blog posts
    const upcomingBlogs = await BlogDetails.find({
      user: userId,
      PublishDate: { $gt: today },
    }).sort({ PublishDate: 1 });

    const responseData = {
      recentBlog: recentBlog || null,
      upcomingBlogs: upcomingBlogs || [],
    };

    if (!recentBlog && upcomingBlogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No recent or upcoming blog posts found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Recent and upcoming blog posts fetched successfully",
      data: responseData,
    });
  } catch (error) {
    console.error(
      "Error while fetching recent and upcoming blog posts:",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.scheduleBlogPostTime = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      startDate,
      endDate,
      blogAutoPostNumber,
      blogAutoPostUnit,
      blogAutoPostTime,
    } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    //chek this user is already exist or not in BlogTopic and BlogDetails db
    //if exist then check for blogSchedule and do below steps else show warning user not exist
    const blogTopic = await BlogTopic.findOne({ user: userId });
    const blogDetails = await BlogDetails.findOne({ user: userId });

    if (!blogTopic || !blogDetails) {
      return res.status(404).json({
        success: false,
        message: "User has no associated blog topics or details",
      });
    }
    //check this user is already exist in blogSchedule db
    let blogSchedule = await BlogSchedule.findOne({ user: userId });
    //then don't create new object for it just update the data of that user (don't duulicate the data for the same user)
    if (blogSchedule) {
      blogSchedule.startDate = startDate;
      blogSchedule.endDate = endDate;
      blogSchedule.blogAutoPostNumber = blogAutoPostNumber;
      blogSchedule.blogAutoPostUnit = blogAutoPostUnit;
      blogSchedule.blogAutoPostTime = blogAutoPostTime;
    } else {
      //if user is not exist in blogSchedule DB then create a new entry for that user
      blogSchedule = new BlogSchedule({
        user: userId,
        startDate: startDate,
        endDate: endDate,
        blogAutoPostNumber: blogAutoPostNumber,
        blogAutoPostUnit: blogAutoPostUnit,
        blogAutoPostTime: blogAutoPostTime,
      });
    }

    await blogSchedule.save();

    return res.status(200).json({
      success: true,
      message: "Blog post schedule saved successfully",
      blogSchedule,
    });
  } catch (error) {
    console.log(
      "Error while scheduling post time ",
      error.message,
      error.stack
    );
    return res.status(500).json({
      success: false,
      message: "Internal server error in scheduling post time",
    });
  }
};

exports.getUserBlogSchedule = async (req, res) => {
  try {
    const userId = req.user.id;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if the user exists in BlogTopic and BlogDetails collections
    const blogTopic = await BlogTopic.findOne({ user: userId });
    const blogDetails = await BlogDetails.findOne({ user: userId });

    if (!blogTopic || !blogDetails) {
      return res.status(404).json({
        success: false,
        message: "User has no associated blog topics or details",
      });
    }

    // Retrieve the user's blog schedule
    const blogSchedule = await BlogSchedule.findOne({ user: userId });

    if (!blogSchedule) {
      return res.status(404).json({
        success: false,
        message: "Blog schedule not found for this user",
      });
    }

    return res.status(200).json({
      success: true,
      data: blogSchedule,
    });
  } catch (error) {
    console.log("Error while fetching user blog schedule ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error in fetching user blog schedule",
    });
  }
};

exports.getBlogPostforWebhook = async (req, res) => {
  try {
    const currentDate = new Date();

    const latestBlog = await BlogDetails.aggregate([
      {
        $match: {
          PublishDate: { $gt: currentDate },
        },
      },
      {
        $sort: { PublishDate: -1 },
      },
      {
        $limit: 1,
      },
    ]);

    res.status(200).json({ latestBlog });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getBlogPostforWebhook = async (req, res) => {
  try {
    const currentDate = new Date();

    const latestBlog = await BlogDetails.aggregate([
      {
        $match: {
          PublishDate: { $gt: currentDate },
        },
      },
      {
        $sort: { PublishDate: -1 },
      },
      {
        $limit: 1,
      },
    ]);

    res.status(200).json({ latestBlog });
    return latestBlog[0];
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.sendBlogPostsViaWebhook = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("User ID:", userId);

    const user = await User.findById(userId);
    console.log("User:", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const project = await Projects.findOne({ user: userId }).exec();
    console.log("Project:", project);

    if (!project) {
      console.error("Project not found for user");
      return res.status(404).json({
        success: false,
        message: "Project not found for user",
      });
    }

    const { domainUrl } = project;
    if (!domainUrl) {
      console.error("Domain URL not found in project");
      return res.status(400).json({
        success: false,
        message: "Domain URL not found in project",
      });
    }
    const webUrl = `https://jhanvient.in/webhook.html`.trim();
    console.log("Domain URL:", webUrl);

    try {
      new URL(webUrl);
    } catch (e) {
      console.error("Invalid Web URL:", webUrl);
      throw new Error("Invalid Web URL");
    }

    const Url = `	https://webhook.site/bec42c21-470e-4dd4-b643-fd51de62c043	`;
    console.log("Webhook URL:", Url);

    const agent = new https.Agent({ keepAlive: false });
    const { post } = req.body;
    if (!post || !post.topic || !post.blogDescription) {
      console.error("Invalid post object:", post);
      return res.status(400).json({
        success: false,
        message: "Invalid post object",
      });
    }

    const payload = {
      topic: post.topic,
      blogDescription: post.blogDescription,
    };
    console.log("Sending article with payload:", payload);

    const response = await axios.post(webUrl, payload, {
      timeout: 10000,
      httpsAgent: agent,
    });
    console.log("Response:", response.data);
    console.log(`Blog post sent and updated successfully for user ${user}`);

    return res.status(200).json({
      success: true,
      message: "Blog post sent successfully",
      data: response.data,
    });
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Error response from server:", error.response.data);
      return res.status(error.response.status).json({
        success: false,
        message: error.response.statusText,
        error: error.response.data,
      });
    } else if (error.request) {
      // Request was made but no response was received
      console.error("No response received:", error.request);
      return res.status(500).json({
        success: false,
        message: "No response received from the server",
        error: error.message,
      });
    } else {
      // Something else happened while setting up the request
      console.error("Error setting up request:", error.message);
      return res.status(500).json({
        success: false,
        message: "Error setting up request",
        error: error.message,
      });
    }
  }
};

// async function checkSchedule() {
//   const now = new Date();
//   console.log("log");
//   // Find blog schedules that match the current time
//   const blogSchedules = await BlogSchedule.find({
//     startDate: { $lte: now },
//     endDate: { $gte: now },
//     blogAutoPostTime: `${now.getHours()}:${now.getMinutes()}`,
//   }).populate("user");

//   console.log(`Found ${blogSchedules.length} blog schedules.`);

//   for (const schedule of blogSchedules) {
//     console.log("Processing schedule:", schedule);

//     const project = await Projects.findOne({ user: schedule.user._id });
//     console.log("Project", project);

//     const latestBlog = await BlogDetails.findOne({
//       user: schedule.user._id,
//       status: "approved",
//       PublishDate: { $lte: now },
//     }).sort({ PublishDate: -1 });
//     console.log("latest blog", latestBlog);

//     if (latestBlog && project) {
//       try {
//         const constUrl = `https://webhook.site/bec42c21-470e-4dd4-b643-fd51de62c043`; // Corrected variable name
//         const payload = {
//           topic: latestBlog.topic,
//           blogDescription: latestBlog.blogDescription,
//         };
//         console.log("Sending payload to:", constUrl);
//         console.log("Payload:", payload);
//         await axios.post(constUrl, payload);
//         // latestBlog.status = "posted";
//         // await latestBlog.save();
//         console.log("Payload sent successfully.");
//       } catch (error) {
//         console.error(
//           `Error posting blog ${latestBlog._id} to ${project.webhookUrl}:`,
//           error
//         );
//       }
//     }
//   }
// }

// Schedule to run every minute
// cron.schedule("* * * * *", checkSchedule);

// console.log("Cron job running every minute to check article schedules.");

const User = require("../../models/User");
const BlogDetails = require("../../models/Blogs/BlogDetails");
const Projects = require("../../models/Projects");
const BlogTopic = require("../../models/Blogs/BlogTopic");
const BlogSchedule = require("../../models/Blogs/BlogSchedule");
const moment = require("moment");
const cron = require("node-cron");
const axios = require("axios");
const https = require("https");
const fs = require("fs");
const path = require("path");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    try {
      const userId = req.user.id; // Assuming user ID is available through authentication
      const user = await User.findById(userId);
      if (!user) {
        return cb(new Error(`User with ID ${userId} not found`));
      }
      const clientId = user.clientId; // Assuming clientId is a field in the User model
      const clientFolderPath = path.join(__dirname, '..', 'BlogImage', clientId.toString());
      if (!fs.existsSync(clientFolderPath)) {
        fs.mkdirSync(clientFolderPath, { recursive: true });
      }
      cb(null, clientFolderPath);
    } catch (error) {
      cb(error);
    }
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname;
    const fileName = `${Date.now()}-${originalName}`;
    cb(null, fileName);
  }
});

const upload = multer({ storage });

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
      publishDate = moment(user.createdAt).add(6, "days").toDate();
    }

    const Blogs = new BlogDetails({
      topic: topic,
      blogDescription: blogDescription,
      user: user._id,
      PId: projectId,
      PublishDate: publishDate,
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
      error: error.message,
    });
  }
};

// exports.uploadBlogImage = upload.single('imageFile'), async (req, res) => {
//   try {
//     const blogId = req.params.blogId;  // Assuming blogId is passed as a parameter
//     const imagePath = req.file.path; // Path to the uploaded file
    
//     // Update the BlogDetails document with the image path
//     const existingBlog = await BlogDetails.findById(blogId);
//     if (!existingBlog) {
//       return res.status(404).json({
//         success: false,
//         message: `Blog with ID ${blogId} not found`,
//       });
//     }

//     existingBlog.blogImage.push(imagePath);
//     await existingBlog.save();

//     return res.status(200).json({
//       success: true,
//       message: `Image uploaded successfully for blogId ${blogId}`,
//       data: {
//         blogId: existingBlog._id,
//         imagePath: imagePath,
//       },
//     });
//   } catch (error) {
//     console.error(`Error saving blog image for blogId ${blogId}:`, error);
//     return res.status(500).json({
//       success: false,
//       message: "Error saving blog image",
//       error: error.message,
//     });
//   }
// };

exports.checkBlogImage = async (req,res) => {
  try {
    const {blogId} = req.body;
    const existingBlog = await BlogDetails.findById(blogId);
    if (!existingBlog) {
      return res.json({
        success:false,
        message:"Blog image not found"
      })
    }
    return { success: true, data: { blogImage: blog.blogImage } };
  } catch (error) {
    console.error(`Error checking blog image for blogId `, error);
    throw error;
  }
};

//modify this function according to save in array
exports.saveBlogImage = async (req, res) => {
  const { blogId, blogImage } = req.body;
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    const clientId = user.userId;
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const existingBlog = await BlogDetails.findById(blogId);
    if (!existingBlog) {
      return res.status(404).json({
        success: false,
        message: `Blog with ID ${blogId} not found`,
      });
    }

   

    const userFolderPath = path.join(__dirname, "..", "BlogImage", clientId);
    if (!fs.existsSync(userFolderPath)) {
      fs.mkdirSync(userFolderPath, { recursive: true });
    }

    const imageExtension = path.extname(new URL(blogImage).pathname);
    const imageFileName = `${topic.replace(/\s+/g, "_")}${imageExtension}`;
    const imagePath = path.join(userFolderPath, imageFileName);
    console.log(imagePath, "imagePath");

    const imageResponse = await axios.get(blogImageURL, {
      responseType: "arraybuffer",
    });

    fs.writeFileSync(imagePath, imageResponse.data);
    existingBlog.blogImage = imagePath;
    await existingBlog.save();

    console.log(`Blog image saved for blogId ${blogId}`);

    return res.status(200).json({
      success: true,
      message: `Blog image saved for blogId ${blogId}`,
      data: {
        blogId: existingBlog._id,
        imagePath: imagePath,
      },
    });
  } catch (error) {
    console.error(`Error saving blog image for blogId ${blogId}:`, error);
    return res.status(500).json({
      success: false,
      message: "Error saving blog image",
      error: error.message,
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
      }
      //{ blogDescription: 1, blogId: 1 }
    );

    if (!blog || !blog.blogDescription) {
      return res.status(404).json({
        success: false,
        message: "No blog found for this topic",
      });
    }

    //console.log("Blog description:", blog.blogDescription);

    return res.status(200).json({
      success: true,
      message: "Blog retrieved successfully by topic",
      blogId: blog._id,
      data: blog.blogDescription,
      image: blog.blogImage,
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
    if (!blogId || !blogDescription) {
      return res.status(400).json({
        success: false,
        message: "Blog ID and Blog Description are required",
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

// function to update blogs in overview page of current blog posts
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
    //PublishDate: { $gte: today } filters the documents to those where the PublishDate field is greater than or equal to today. This means we're looking for blog posts published today or later.
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

async function sendBlog(
  blogID,
  topic,
  blogDescription,
  publishDate,
  approvedDate,
  status,
  webhookUrl
) {
  const payload = {
    BlogID: blogID,
    Topic: topic,
    BlogDescription: blogDescription,
    PublishDate: publishDate,
    ApprovedDate: approvedDate,
    Status: status,
  };

  // console.log("Sending article with payload:", payload);

  const agent = new https.Agent({ keepAlive: false });

  try {
    const response = await axios.post(webhookUrl, payload, {
      timeout: 10000,
      httpsAgent: agent,
    });
    console.log(`Status: ${response.status}`);
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "Response error:",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error:", error.message);
    }
  }
}

exports.sendBlog = async (req, res) => {
  const { blogID } = req.body;

  try {
    const blog = await BlogDetails.findById(blogID);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    const projectId = blog.PId;
    const projectDetails = await Projects.findById(projectId);
    const webhookUrl = projectDetails.webhookUrl;
    console.log(webhookUrl, " projectDetails");
    if (!projectDetails) {
      return res.status(404).json({
        success: false,
        message: "Project details not found",
      });
    }

    const topic = blog.topic;
    const blogDescription = blog.blogDescription;
    const publishDate = blog.PublishDate;
    const approvedDate = blog.approvedDate; // Assuming approvedDate is the same as PublishDate
    const status = blog.status;

    const blogResponse = await sendBlog(
      blogID,
      topic,
      blogDescription,
      publishDate,
      approvedDate,
      status,
      webhookUrl
    );
    console.log(blogResponse, "blogResponse ");
    res.status(200).json({
      success: true,
      message: "Article sent successfully",
      data: blogResponse,
    });
  } catch (error) {
    console.error("Error while sending article:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send article",
    });
  }
};

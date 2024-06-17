const express = require("express");
const router = express.Router();

const {
  saveBlogTopic,
  getBlogTopics,
} = require("../controllers/BlogTopicGenerator/BlogTopicGenerator");

const {
  saveBlogs,
  getAllBlogs,
  checkBlogsAvailability,
  getEachSingleBlogs,
  updateBlogDescription,
  approveBlog,
  getBlogStatusByTopic,
  getRecentBlogPost,
  scheduleBlogPostTime,
  getUserBlogSchedule,
} = require("../controllers/BlogTopicGenerator/BlogDetails");

const {
  getBlogPostforWebhook,
  sendBlogPostsViaWebhook,
  processBlogPost,
} = require("../controllers/BlogTopicGenerator/BlogDetails");

const { auth } = require("../middlewares/auth");

router.post("/blog-topic-generator", auth, saveBlogTopic);
router.get("/fetch-blog-topics", auth, getBlogTopics);

router.post("/save-blogs", auth, saveBlogs);
router.get("/get-allblogs", auth, getAllBlogs);
router.get("/check-blogs", auth, checkBlogsAvailability);
router.get("/fetch-eachBlogs/:topic(*)", auth, getEachSingleBlogs);
router.put("/update-each-blog-desc", auth, updateBlogDescription);
router.put("/blogs/:blogId/approve", approveBlog); //http://localhost:4000/openAi/blogs/66703062bfa280c54e2ddbfd/approve
router.get("/blogs/status/:topic", getBlogStatusByTopic);
router.get("/recent-blogs/publish", auth, getRecentBlogPost);

// schedule blog post time route
router.post("/schedule-blog-time", auth, scheduleBlogPostTime);
router.get("/fetch-user-scheduled-time", auth, getUserBlogSchedule);

////webhook
router.get("/webhook/recent-blog-post", auth, getBlogPostforWebhook);
//router.post("/send-blog-post",auth,sendBlogPostsViaWebhook);

router.post("/send-blog-post", auth, async (req, res) => {
  const { post } = req.body;

  try {
    if (!post || !post.topic || !post.blogDescription) {
      return res.status(400).json({
        success: false,
        message: "Invalid post data. 'topic' and 'blogDescription' are required.",
      });
    }

    // Call sendBlogPostsViaWebhook function with req, res, and post
    await sendBlogPostsViaWebhook(req, res, post);
  } catch (error) {
    // If sendBlogPostsViaWebhook fails, send error response
    console.error("Error while sending article:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send article",
      error: error.message, // Include error message in response
    });
  }
});

// Route to receive webhook data
router.get('/webhooks/receive', (req, res) => {
  const { topic, blogDescription } = req.body;
  console.log("Received webhook data:", { topic, blogDescription });

  res.status(200).json({
    success: true,
    message: 'Webhook data received successfully',
    data: { topic, blogDescription }
  });
});


module.exports = router;

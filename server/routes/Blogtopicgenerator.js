const express = require("express");
const router = express.Router();

const {
  saveBlogTopic,
  getBlogTopics,
} = require("../controllers/BlogTopicGenerator/BlogTopicGenerator");

const {
  saveBlogs,
  checkBlogImage,
 saveBlogImage,
  getAllBlogs,
  checkBlogsAvailability,
  getEachSingleBlogs,
  updateBlogDescription,
  approveBlog,
  getBlogStatusByTopic,
  getRecentBlogPost,
  scheduleBlogPostTime,
  getUserBlogSchedule,
  sendBlog,
  uploadBlogImage,
} = require("../controllers/BlogTopicGenerator/BlogDetails");


const { auth } = require("../middlewares/auth");

router.post("/blog-topic-generator", auth, saveBlogTopic);
router.get("/fetch-blog-topics", auth, getBlogTopics);


//blog content related route
router.post("/save-blogs", auth, saveBlogs);
router.get("/get-allblogs", auth, getAllBlogs);
router.get("/check-blogs", auth, checkBlogsAvailability);
router.get("/fetch-eachBlogs/:topic(*)", auth, getEachSingleBlogs);
router.put("/update-each-blog-desc", auth, updateBlogDescription);
router.put("/blogs/:blogId/approve", approveBlog); //http://localhost:4000/openAi/blogs/66703062bfa280c54e2ddbfd/approve
router.get("/blogs/status/:topic", getBlogStatusByTopic);
router.get("/recent-blogs/publish", auth, getRecentBlogPost);


router.post("/save/blog-image" , auth , saveBlogImage);
router.get("/check/blog-image" , checkBlogImage)
//router.post("/blog/:blogId/upload-image" , uploadBlogImage)
// schedule blog post time route
router.post("/schedule-blog-time", auth, scheduleBlogPostTime);
router.get("/fetch-user-scheduled-time", auth, getUserBlogSchedule);

//route to send blog in webhook url 
router.post('/sendBlog', auth, sendBlog);
module.exports = router;

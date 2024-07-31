const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const multer = require("multer");

const upload = multer({ 
  dest: "uploads/", // Adjust the destination folder as per your project structure
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["application/vnd.ms-excel", "text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only CSV and Excel files are allowed"));
    }
  }
});

const {executeWorkflow} = require("../controllers/BlogTopicGenerator/SendBlogToWordpress")

const {
  saveBlogTopic,
  getBlogTopics,
  addNewBlogTopic,
  uploadBlogTopicsFile,
  downloadBlogTopicsFile 
} = require("../controllers/BlogTopicGenerator/BlogTopicGenerator");

const {
  saveBlogs,
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
  selectBlogImage,
  updatePublishDate ,
} = require("../controllers/BlogTopicGenerator/BlogDetails");



router.post("/blog-topic-generator", auth, saveBlogTopic);
router.get("/fetch-blog-topics", auth, getBlogTopics);
router.post("/add-blog-topic" , auth , addNewBlogTopic)
router.post("/upload-blog-topics", auth, upload.single("file"), uploadBlogTopicsFile);
router.get('/download-excel/blog-topics' ,auth, downloadBlogTopicsFile )


//blog content related route
router.post("/save-blogs", auth, saveBlogs);
router.get("/get-allblogs", auth, getAllBlogs);
router.get("/check-blogs", auth, checkBlogsAvailability);
router.get("/fetch-eachBlogs/:topic(*)", auth, getEachSingleBlogs);
router.put("/update-each-blog-desc", auth, updateBlogDescription);
router.put("/blogs/:blogId/approve", approveBlog); //http://localhost:4000/openAi/blogs/66703062bfa280c54e2ddbfd/approve
router.get("/blogs/status/:topic", getBlogStatusByTopic);
router.get("/recent-blogs/publish", auth, getRecentBlogPost);
router.put('/update-publish-date', updatePublishDate);


router.post("/save/blog-image" , auth , saveBlogImage);
router.post("/blog/:blogId/upload-image", auth, uploadBlogImage);
router.put("/blog/selected-image" , auth , selectBlogImage);

// schedule blog post time route
router.post("/schedule-blog-time", auth, scheduleBlogPostTime);
router.get("/fetch-user-scheduled-time", auth, getUserBlogSchedule);

//route to send blog in webhook url to php integrated website
router.post('/sendBlog', auth, sendBlog);



//route to send blog to wordpress integrated website
router.post('/publish-blog', async (req, res) => {
  const { blogId, wordpressUrl } = req.body;
  
  if (!blogId || !wordpressUrl) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    await executeWorkflow(blogId, wordpressUrl);
    res.status(200).json({ message: 'Blog sent to WordPress successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error publishing blog', error: error.message });
  }
});



module.exports = router;

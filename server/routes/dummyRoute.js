const express = require("express");
const router = express.Router();
const axios = require("axios");

const sendArticle = require('../controllers/dummy');

router.post('/sendArticle', async (req, res) => {
    const { articleID, articleContent, clientID } = req.body;

    try {
        await sendArticle(articleID, articleContent, clientID);
        res.status(200).json({
            success: true,
            message: 'Article sent successfully'
        });
    } catch (error) {
        console.error('Error while sending article:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send article'
        });
    }
});

module.exports = router;




// router.post("/test-webhook", async (req, res) => {
//   const { Url, topic, blogDescription } = req.body;
//   try {
//     await axios.post(Url, { topic, blogDescription });
//     res.status(200).send("Test webhook sent successfully");
//   } catch (error) {
//     res.status(500).send(`Error sending test webhook: ${error.message}`);
//   }
// });


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
//         constUrl = `https://fritado.com/webhook.php`;
//         const payload = {
//           topic: latestBlog.topic,
//           blogDescription: latestBlog.blogDescription,
//         };
//         await axios.post(Url, payload);
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

// exports.getBlogPostforWebhook = async (req, res) => {
//   try {
//     const currentDate = new Date();

//     const blogSchedule = await BlogSchedule.findOne({
//       user: req.user.id,
//       startDate: { $lte: currentDate },
//       endDate: { $gte: currentDate },
//     });
//     console.log(blogSchedule);

//     if (!blogSchedule) {
//       return res.status(404).json({ error: "No active blog schedule found." });
//     }

//     const latestBlog = await BlogDetails.findOne({
//       user: req.user.id,
//       status: "approved",
//       PublishDate: { $lte: currentDate },
//     }).sort({ PublishDate: -1 });

//     if (!latestBlog) {
//       return res.status(404).json({ error: "No approved blog found." });
//     }

//     res.status(200).json({ latestBlog });
//   } catch (error) {
//     console.error("Error fetching latest blog:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

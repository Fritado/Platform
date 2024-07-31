const BlogTopic = require("../../models/Blogs/BlogTopic");
const User = require("../../models/User");
const Projects = require("../../models/Projects");
const multer = require("multer");
const csv = require("csv-parser");
const xlsx = require("xlsx");
const path = require("path");
const fs = require("fs");
const ExcelJS = require("exceljs");
const mongoose = require("mongoose");
const BlogDetails = require("../../models/Blogs/BlogDetails");

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

exports.addNewBlogTopic = async (req, res) => {
  try {
    const { topic } = req.body;
    const userId = req.user.id;

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
        message: "Project details not found",
      });
    }
    const projectId = projectDetails._id;
    let blogTopic = await BlogTopic.findOne({ user: userId });

    if (blogTopic) {
      // If blogTopic exists, add the new topic to the array if it's unique
      if (!blogTopic.topics.includes(topic)) {
        blogTopic.topics.push(topic);
        await blogTopic.save();
      }
    } else {
      // Create a new BlogTopic instance if it doesn't exist
      blogTopic = new BlogTopic({
        topics: [topic], // Start with a new array containing the single topic
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
    console.error("Error saving blog topic:", error.message);
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

exports.downloadBlogTopicsFile = async (req, res) => {
  try {
    const blogTopics = await BlogTopic.find({ user: req.user.id });

    // Initialize an array to store the data for the Excel file
    const data = [["Topic", "Publish Date", "Approved Date", "Status"]];

    // Iterate over each topic and fetch its details from BlogDetails
    for (const topicObj of blogTopics) {
      for (const topic of topicObj.topics) {
        const blogDetails = await BlogDetails.findOne({
          topic,
          user: req.user.id,
        });
        if (blogDetails) {
          const { PublishDate, approvedDate, status } = blogDetails;
          const rowData = [
            topic,
            PublishDate ? new Date(PublishDate).toLocaleDateString() : "N/A",
            approvedDate ? new Date(approvedDate).toLocaleDateString() : "N/A",
            status || "N/A",
          ];
          data.push(rowData);
        } else {
          // If no details found for a topic, add default values
          const rowData = [topic, "N/A", "N/A", "N/A"];
          data.push(rowData);
        }
      }
    }
    // Create a new workbook and add the data to a sheet
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.aoa_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "BlogTopics");

    // Write the workbook to a buffer
    const buffer = xlsx.write(wb, { bookType: "xlsx", type: "buffer" });

    // Set the headers and send the buffer as a downloadable file
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="blog_topics.xlsx"'
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);

    // console.log('Excel file generated successfully.');
  } catch (error) {
    console.error("Error generating Excel file:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.uploadBlogTopicsFile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Find user and project details
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
        message: "Project details not found",
      });
    }

    const projectId = projectDetails._id;

    // Process the uploaded file (CSV or XLSX)
    let topics = [];

    if (
      req.file.mimetype === "text/csv" ||
      req.file.mimetype === "application/vnd.ms-excel"
    ) {
      // CSV file
      topics = await parseCSV(req.file.path);
    } else if (
      req.file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      // XLSX file
      topics = await parseXLSX(req.file.path);
    }
    console.log("Parsed topics:", topics);
    // Remove uploaded file after parsing
    fs.unlinkSync(req.file.path);

    // Check if topics array is not empty
    if (topics.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid topics found in the file",
      });
    }

    // Find or create BlogTopic document for the user
    let blogTopic = await BlogTopic.findOne({ user: userId });

    if (blogTopic) {
      // If blogTopic exists, update the topics array with unique values
      const uniqueTopics = new Set([...blogTopic.topics, ...topics]);
      blogTopic.topics = Array.from(uniqueTopics);
      await blogTopic.save();
    } else {
      // Create a new BlogTopic instance if it doesn't exist
      blogTopic = new BlogTopic({
        topics,
        user: user._id,
        PId: projectId,
      });
      await blogTopic.save();
    }

    return res.status(200).json({
      success: true,
      message: "Blog topics uploaded and updated successfully",
      data: blogTopic,
    });
  } catch (error) {
    console.error("Error uploading blog topics file:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Helper function to parse CSV file
function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const topics = [];
    fs.createReadStream(filePath, { encoding: "utf-8" })
      .pipe(csv())
      .on("data", (row) => {
        const topicValues = Object.values(row);
        topics.push(...topicValues);
      })
      .on("end", () => {
        resolve(topics);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

// Helper function to parse XLSX file
function parseXLSX(filePath) {
  return new Promise((resolve, reject) => {
    const topics = [];
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    // Assuming 'Blog Topics' is the header
    const topicColumnIndex = rows[0].indexOf("Blog Topics");

    if (topicColumnIndex === -1) {
      return reject(
        new Error('Unable to find "Blog Topics" column in the file.')
      );
    }

    // Extract topics from the column
    for (let i = 1; i < rows.length; i++) {
      // Start from index 1 to skip header row
      const cellValue = rows[i][topicColumnIndex];
      if (typeof cellValue === "string" && cellValue.trim().length > 0) {
        topics.push(cellValue.trim()); // Push trimmed textual data into topics array
      }
    }

    resolve(topics);
  });
}

const mongoose = require("mongoose");

const blogDetailsSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    blogDescription: {
      type: String,
      required: true,
    },
    blogImage: {
      type: [String],
      default: [],
    },
    selectedImage: {
      type: String, 
      default: "", 
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    PId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Projects",
    },
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
    approvedDate:{
      type:Date,
    },
    PublishDate:{
      type:Date
      
    },
    blogPostingStatus:{
      type: String,
      enum: ["Pending", "Published"],
      default: "Pending",
    }
  },
  { timestamps: true }
);

const BlogDetails = mongoose.model("BlogDetails", blogDetailsSchema);

module.exports = BlogDetails;

const mongoose = require("mongoose");

const blogTopicSchema = new mongoose.Schema(
  {
    topics: [
      {
        type: String,
        trim: true,
      },
    ],

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
  },
  { timestamps: true }
);

const BlogTopic = mongoose.model("BlogTopic", blogTopicSchema);

module.exports = BlogTopic;

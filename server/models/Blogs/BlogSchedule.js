const mongoose = require("mongoose");

const blogScheduleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  blogAutoPostNumber: {
    type: Number,
    required: true,
  },
  blogAutoPostUnit: {
    type: String,
    required: true,
  },
  blogAutoPostTime: {
    type: String,
    required: true,
  },
});

const BlogSchedule = mongoose.model("BlogSchedule", blogScheduleSchema);

module.exports = BlogSchedule;

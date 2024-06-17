const mongoose = require("mongoose");

const KeywordsSchema = new mongoose.Schema(
  {
    keywords: [
      {
        type: String,
      },
    ],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Keyword", KeywordsSchema);

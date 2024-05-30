const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    location: [
      {
        type: String,
        required: true,
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

module.exports = mongoose.model("Location", locationSchema);

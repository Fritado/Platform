const mongoose = require("mongoose");

const facebookSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    facebookId: {
      type: String,
      required: true,
      unique: true,
    },
    facebookToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Facebook", facebookSchema);

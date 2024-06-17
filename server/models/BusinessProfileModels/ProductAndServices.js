const mongoose = require("mongoose");

const ProductAndServiceSchema = new mongoose.Schema(
  {
    productAndServices: [
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

module.exports = mongoose.model("ProductAndService", ProductAndServiceSchema);

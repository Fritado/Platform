const mongoose = require("mongoose");

const packageModelSchema = new mongoose.Schema({
  packageId: {
    type: Number,
    unique: true,
    required: true,
  },
  packageName: {
    type: String,
    required: true,
  },
  packagePrice: {
    type: String,
    required: true,
  },
  validity: {
    type: String,
    required: true,
  },
  blogPost: {
    type: Number,
    required: true,
  },
});

const PackageModel = mongoose.model("PackageModel", packageModelSchema);

module.exports = PackageModel;

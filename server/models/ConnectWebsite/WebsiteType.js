const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for a website type
const websiteTypeSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  projectName: {
    type: String,
  
  },
  websiteType: {
    type: String,
    required: true,
    
  },
  technology: {
    type:String,
    required: true,
  },
});

// Create the model from the schema
const WebsiteType = mongoose.model("WebsiteType", websiteTypeSchema);

module.exports = WebsiteType;

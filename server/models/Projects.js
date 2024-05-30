const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    domainUrl: [
      {
        type: String,
        required: true,
      },
    ],
    webhookUrl:{
      type:String,
      
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  
);

module.exports = mongoose.model("Project", projectSchema);

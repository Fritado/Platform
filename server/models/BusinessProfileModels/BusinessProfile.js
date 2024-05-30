const mongoose = require('mongoose')

const BusinessProfileSchema = new mongoose.Schema(
  {
    // businessName: {
    //   type: String,
    //   trim: true,
    // },
    aboutBusiness: {
      type: String,
      trim: true,
      
    },
    companyName: {
      type: String,
      trim: true,
    },
    industryType: {
      type: String,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('BusinessProfile', BusinessProfileSchema)

const mongoose = require('mongoose')

const billingPlansSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  freeTrialEndDate: {
    type: Date,
  },
  paymentDueDate:{
    type: Date,
  },
  paymentStatus: {
    type: Boolean,
  },
})

const BillingPlans = mongoose.model('BillingPlans', billingPlansSchema)

module.exports = BillingPlans

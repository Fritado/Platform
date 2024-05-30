const mongoose = require('mongoose')

const billingPlansSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  freeTrialEndDate: {
    //user registration + 7 days (including registation date and trail end date)
    type: Date,
  },

  paymentStatus: {
    type: Boolean,
  },
})

const BillingPlans = mongoose.model('BillingPlans', billingPlansSchema)

module.exports = BillingPlans

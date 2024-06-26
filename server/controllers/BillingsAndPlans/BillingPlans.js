const User = require('../../models/User')
const BillingPlans = require('../../models/BillingsPlans/BillingPlan')
const moment = require('moment')

//review this function and delete if not needed
exports.trialDateAndPaymentStatus = async (req, res) => {
  try {
    const userId = req.user.id
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found please signup first',
      })
    }
    let billingPlan = await BillingPlans.findOne({ user: userId })
    if (!billingPlan) {
      const freeTrialEndDate = moment(user.createdAt).add(6, 'days').toDate()
      billingPlan = new BillingPlans({
        user: userId,
        freeTrialEndDate,
        paymentStatus: false,
      })
      await billingPlan.save()
    }
    return res.status(200).json({
      success: true,
      message: 'Trial date and payment status updated successfully',
    })
  } catch (error) {
    console.error('Error while saving Trial Date and Payment Status', error)
    return res.status(500).json({
      success: false,
      message: 'Error while trail date creation in db',
    })
  }
}

exports.getBillingDetails = async (req, res) => {
  try {
    const userId = req.user.id

    // Find the billing plan for the user
    const billingPlan = await BillingPlans.findOne({ user: userId })
    if (!billingPlan) {
      return res.status(404).json({
        success: false,
        message: 'Billing plan not found for the user',
      })
    }
    const formattedEndDate = new Date(billingPlan.freeTrialEndDate).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    return res.status(200).json({
      success: true,
      data: {
        ...billingPlan.toObject(),
        freeTrialEndDateFormatted: formattedEndDate,
      },
    })
  } catch (error) {
    console.error('Error while fetching billing details:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}


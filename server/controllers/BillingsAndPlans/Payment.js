const User = require('../../models/User')
const Payment = require('../../models/BillingsPlans/payment')
const { instance } = require('../../config/razorpay')
const crypto = require('crypto')

exports.checkout = async (req, res) => {
  try {
    const { paymentAmount } = req.body
    const userId = req.user.id

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      })
    }
    const options = {
      amount: paymentAmount * 100,
      currency: 'USD',
      //receipt: Math.random(Date.now()).toString(),
    }
    const order = await instance.orders.create(options)
    await Payment.create({
      userId: userId,
      order_id: order.id,
      paymentAmount: paymentAmount / 100,
      paymentDate: new Date(),
    })
    // console.log('order', order)

    res.status(200).json({
      success: true,
      message: order,
    })
  } catch (error) {
    console.log(error, 'Error in payment process while checkout')
    return res.status(500).json({
      success: false,
      message: 'Error in payment process while checkout , please check backend code!',
    })
  }
}

exports.paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(200).json({ success: false, message: 'Payment Failed' })
    }
    const body = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest('hex')

    const isAuthentic = expectedSignature === razorpay_signature

    if (isAuthentic) {
      await Payment.findOneAndUpdate(
        { order_id: razorpay_order_id },
        {
          $set: {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            paymentStatus: 'Paid',
          },
        },
        { new: true },
      )
      return res.status(200).json({
        success: true,
        message: 'Payment successfull done',
      })
    } else {
      return res.status(400).json({
        success: 'false',
        message: 'Invalid signature, Payment Failed',
      })
    }
  } catch (error) {
    console.log(error, 'Error in payment verification')
    return res.status(500).json({
      success: false,
      message: 'Error in payment verification, please check backend code!',
    })
  }
}

exports.getPaymentDetailsByUserId = async (req, res) => {
  try {
    const userId = req.userId

    const payment = await Payment.findOne({ user: userId }).exec()

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment details not found for the user',
      })
    }

    return res.status(200).json({
      success: true,
      data: payment,
    })
  } catch (error) {
    console.log(error, 'Error while retrieving payment details')
    return res.status(500).json({
      success: false,
      message: 'Error while retrieving payment details, please check backend code!',
    })
  }
}


exports.getApiKey = async (req, res) => {
  try{
    return res.status(200).json({ key: process.env.RAZORPAY_KEY })
  }catch(error){
    console.log("error while getting api key from backend side" , error);
  }
}

const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  order_id: {
    type: String,
  },
  razorpay_order_id: {
    type: String,
    default: null,
  },
  razorpay_payment_id: {
    type: String,
    default: null,
  },
  razorpay_signature: {
    type: String,
    default: null,
  },
  paymentAmount: {
    type: Number,
    default: null,
  },
  paymentDate: {
    type: Date,
    default: null,
  },
  paymentStatus: {
    type: String,
    enum: ['Unpaid', 'Paid'],
    default: 'Unpaid',
  },
})

const Payment = mongoose.model('Payment', paymentSchema)

module.exports = Payment

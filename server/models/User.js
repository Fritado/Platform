const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      //required: true,
      unique: true,
    },
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
    },
    contactNumber: {
      type: Number,
    },
    token: {
      type: String,
    },
    accountStatus: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    hasLoggedInBefore: {
      type: Boolean,
      default: false,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  { timestamps: true },
)


// Middleware to update account status based on payment status
userSchema.pre('save', async function(next) {
  try {
    const Payment = require('./BillingsPlans/payment')
    const payments = await Payment.find({ user: this._id }).sort('-createdAt').limit(1)
    if (payments.length > 0 && payments[0].paymentStatus === 'Paid') {
      this.accountStatus = 'Active'
    } else {
      this.accountStatus = 'Inactive'
    }
    next()
  } catch (error) {
    next(error)
  }
})
module.exports = mongoose.model('User', userSchema)

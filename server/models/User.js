const mongoose = require("mongoose");
const Payment = require("./BillingsPlans/payment");
const BillingPlan = require("./BillingsPlans/BillingPlan");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
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
      type: String,
      required: true,
    },
    termsAccepted: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
    accountStatus: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    Plan: {
      type: String,
      enum: ["Default", "Standard", "Premium"],
      default: "Default",
    },
    hasLoggedInBefore: {
      type: Boolean,
      default: false,
    },
    lastVisited: {
      type: String,
      default: "/business-info",
    },
    stepsCompleted: {
      type: Boolean,
      default: false,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Middleware to update account status based on payment status
userSchema.pre("save", async function (next) {
  try {
    const currentDate = new Date();
    const freeTrialEndDate = new Date(
      this.createdAt.getTime() + 6 * 24 * 60 * 60 * 1000
    );

    // Check the most recent payment
    const payments = await Payment.find({ user: this._id })
      .sort("-createdAt")
      .limit(1);

    let accountStatus = "Inactive";
    let paymentStatus = false;
    let paymentDueDate = freeTrialEndDate;

    if (currentDate <= freeTrialEndDate) {
      // Scenario 1: User within Free Trial Period
      accountStatus = "Active";
      paymentStatus = false;

      if (payments.length > 0 && payments[0].paymentStatus === "Paid") {
        const paymentDate = new Date(payments[0].createdAt);
        const extendedTrialEndDate = new Date(
          freeTrialEndDate.getTime() + 30 * 24 * 60 * 60 * 1000
        );

        // Scenario 4: User Makes Payment During Free Trial Period
        if (paymentDate <= freeTrialEndDate) {
          paymentDueDate = extendedTrialEndDate;
          accountStatus = "Active";
          paymentStatus = true;
        }
      }
    } else {
      // User is outside the free trial period
      if (payments.length > 0 && payments[0].paymentStatus === "Paid") {
        const paymentDate = new Date(payments[0].createdAt);
        const paymentExpires = new Date(
          paymentDate.getTime() + 29 * 24 * 60 * 60 * 1000
        );

        // Scenario 3: User Outside Free Trial Period, Payment Made
        if (currentDate <= paymentExpires) {
          accountStatus = "Active";
          paymentStatus = true;
          paymentDueDate = paymentExpires;
        }
      } else {
        // Scenario 2: User Outside Free Trial Period, No Payment
        accountStatus = "Inactive";
        paymentStatus = false;
      }
    }

    this.accountStatus = accountStatus;

    // Update the BillingPlans entry
    await BillingPlan.findOneAndUpdate(
      { user: this._id },
      {
        freeTrialEndDate: freeTrialEndDate,
        paymentDueDate: paymentDueDate,
        paymentStatus: paymentStatus,
      },
      { new: true }
    );

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);

const express = require('express')
const router = express.Router()

const { checkout, paymentVerification , getPaymentDetailsByUserId , getApiKey} = require('../controllers/BillingsAndPlans/Payment')
const { auth } = require('../middlewares/auth')
const {
  trialDateAndPaymentStatus,
  getBillingDetails,
} = require('../controllers/BillingsAndPlans/BillingPlans')

router.post('/checkout', auth, checkout)
router.post('/payment-verification', paymentVerification);
router.get('/fetching-payment-details' ,auth , getPaymentDetailsByUserId)
router.get('/get-payment-key', getApiKey);

router.post('/trial-date', auth, trialDateAndPaymentStatus)
router.get('/getting-trial-date', auth, getBillingDetails)
module.exports = router

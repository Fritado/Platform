import axios from 'axios'
import { BILLING_PLANS_PAYMENT } from '../services/APIURL/Apis'

export const getTrialDate = async (req, res) => {
  const trailDateUrl = `${BILLING_PLANS_PAYMENT.GET_TRIAL_DATE}`
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not found')
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const trialDateResponse = await axios.get(trailDateUrl, config)
    return trialDateResponse;
  } catch (error) {
    console.log(error, 'Error while fetching trial date')
  }
}

export const getPaymentDetails = async (req, res) => {
  const fetchPaymentUrl = `${BILLING_PLANS_PAYMENT.GET_PAYMENT_DETAILS}`
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not found')
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const paymentDetails = await axios.get(fetchPaymentUrl, config)
    return paymentDetails
  } catch (error) {
    console.log(error, 'Error while fetching payment details')
  }
}


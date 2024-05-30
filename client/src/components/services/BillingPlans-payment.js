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
    return trialDateResponse
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

const checkoutHandler = async () => {
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
    const order = await axios.post(
      'http://localhost:4000/api/payment/checkout',
      {
        paymentAmount: price / 100,
      },
      config,
    )
    //console.log('Response order', order.data)

    var options = {
      key: 'rzp_live_nfE5UdiBo9xVul',
      amount: price,
      currency: 'USD',
      name: 'Fritado Technologies',
      description: 'Test Transaction',
      image: 'https://example.com/your_logo', //fritado logo
      order_id: order.data.message.id,
      callback_url: 'http://localhost:4000/api/payment/payment-verification',
      prefill: {
        name: 'Gaurav Kumar', //your customer's name
        email: 'gaurav.kumar@example.com',
        contact: '9000090000', //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    }
    var rzp1 = new window.Razorpay(options)
    rzp1.open()
  } catch (error) {
    console.log(error, 'Error in checkout')
  }
}

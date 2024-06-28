import React, { useState, useEffect,useCallback } from 'react'
import BillingPlans from './BillingPlans'
import { Link } from 'react-router-dom'
import { LuBadgeHelp } from 'react-icons/lu'
import { BillingList1, BillingList2 } from '../data/billingPlansData'
import { TiTick } from 'react-icons/ti'
import { RxCross2 } from 'react-icons/rx'
import { GoArrowUpRight } from 'react-icons/go'
import BillingModelBox from './BillingModelBox'
import axios from 'axios'
import { getTrialDate, getPaymentDetails } from '../../services/BillingPlans-payment'
import { getUserDetails ,updateUserPlan} from '../../services/Auth/AuthApi'
import { fetchAllPackages } from '../../services/Subscription/PackageManagerService'

const BillingAndPlans = () => {
  const [showModal, setShowModal] = useState(false)
  const [trialDate, setTrialDate] = useState()
  const [paymentStatus, setPaymentStatus] = useState('Unpaid')
  const [userDetails, setUserDetails] = useState({})
  const [plans, setPlans] = useState([])
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [hasPaidForPremium, setHasPaidForPremium] = useState(false)

  const fetchHandler = useCallback(async () => {
    try {
      const trialRes = await getTrialDate()
      const paymentDetails = await getPaymentDetails()
      const userResponse = await getUserDetails()
      const PlanDetails = await fetchAllPackages()
      console.log(PlanDetails , "PlanDetails")
      setUserDetails(userResponse)
      setPlans(PlanDetails.packages)

      const { paymentStatus } = paymentDetails.data.data
      setPaymentStatus(paymentStatus)

      const { freeTrialEndDateFormatted } = trialRes.data.data
      setTrialDate(freeTrialEndDateFormatted)

      const standardPlan = PlanDetails.packages.find((plan) => plan.packageName === 'Standard')
      setSelectedPlan(standardPlan)
    } catch (error) {
      console.log(error, 'Error in checkout')
    }
  },[]);

  const closeModel = () => {
    return setShowModal(false)
  }
  useEffect(() => {
    fetchHandler()
  }, [fetchHandler])

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
      const {
        data: { key },
      } = await axios.get('http://localhost:4000/api/payment/get-payment-key')
      //console.log(key , "key");

      const order = await axios.post(
        'http://localhost:4000/api/payment/checkout',
        {
          //price / 100
          paymentAmount: selectedPlan.packagePrice,
        },
        config,
      )
      const { firstname, lastname, email, contactNumber } = userDetails
      var options = {
        key,
        amount: selectedPlan.packagePrice * 100,
        currency: 'USD',
        name: 'Fritado Technologies',
        description: 'Test Transaction',
        image: 'https://example.com/your_logo', 
        order_id: order.data.message.id,
        callback_url: 'http://localhost:4000/api/payment/payment-verification',
        prefill: {
          name: `${firstname} ${lastname}`,
          email: email,
          contact: contactNumber,
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#3399cc',
        },
        handler: async (response) => {
          try {
            console.log('Sending packageName:', selectedPlan.packageName); 
            const updateResponse = await updateUserPlan(selectedPlan.packageName);
            if (updateResponse.success) {
              setPlanUpdateSuccess(true);
            } if (selectedPlan.packageName === 'Premium') {
              setHasPaidForPremium(true);
            }
             else {
              throw new Error('Plan update failed');
            }
          } catch (error) {
            console.log(error, 'Error updating user plan');
          }
        },
      }
      var rzp1 = new window.Razorpay(options)
      rzp1.open()
      
    } catch (error) {
      console.log(error, 'Error in checkout')
    }
  }

  const handlePlanChange = () => {
    const premiumPlan = plans.find((plan) => plan.packageName === 'Premium');
    setSelectedPlan(premiumPlan);
    setIsPremium(true);
  };

  return (
    <div>
      <BillingPlans />
      {showModal && (
        <div className="modal-overlay" onClick={closeModel}>
          <div className="modal-container">
            <BillingModelBox closeModel={closeModel} />
          </div>
        </div>
      )}
      <div className="container mb-4">
        <div className=" ms-2 d-flex flex-column py-3 px-4 border rounded">
          <div className="justify-content-between d-flex flex-column  flex-sm-row ">
            <div className="mb-3 mb-sm-0">
              <div className="d-flex mb-3 align-items-center">
                <h3 className="fw-bold mb-0 me-2">Free Trial until {trialDate}</h3>

                <button className=" ms-2 border-0 rounded py-1 px-3" onClick={checkoutHandler}>
                  {paymentStatus === 'Unpaid' ? 'Pay Now' : 'Paid'}
                </button>
              </div>
              <p className="">
                Lorem Free Trial until Feb Free Trial until {trialDate} $
                {selectedPlan?.packagePrice}
              </p>
            </div>
            <div className="d-flex flex-md-row flex-sm-column" style={{ gap: '14px' }}>
              <button className="btn-db bg-danger px-3 py-2" onClick={() => setShowModal(true)}>
                Cancel Subscription
              </button>

              <button
                className="btn-db px-3 py-2"
                onClick={handlePlanChange}
                disabled={isPremium || hasPaidForPremium}
              >
                 {isPremium || hasPaidForPremium ? 'Downgrade to standard plan' : 'Upgrade to premium plan'}
              </button>
            </div>
          </div>
          <div className="my-3">
            <div className="border px-4 py-3 bg-white rounded">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h3 className="fw-bold m-0">Fritado standard</h3>
                  <p className="mt-2 text-secondary">Hello Fritdao standard</p>
                </div>
                <span>
                  <Link to="/help-center-page" target="_blank">
                    <LuBadgeHelp size={25} />
                  </Link>
                </span>
              </div>
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
                <div className="mb-3 mb-sm-0">
                  <h4 className="text-secondary">Included with Fritdao started</h4>
                  <ul>
                    {BillingList1.map((item) => {
                      return (
                        <li key={item.id} className="d-flex align-items-center">
                          <TiTick size={24} color="green" />
                          {item.option}
                        </li>
                      )
                    })}
                  </ul>
                </div>
                <div>
                  <h4 className="text-secondary">Not Included</h4>
                  <ul>
                    {BillingList2.map((item) => {
                      return (
                        <li key={item.id} className="d-flex align-items-center">
                          <RxCross2 size={22} color="red" />
                          {item.option}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="my-3">
            <div className="border px-4 py-3 bg-white rounded">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h3 className="fw-bold m-0">Payment methods</h3>
                  <p className="mt-2 text-secondary">
                    View your current payment method switch to your new payment method or view ypur
                    payment history with stripe
                  </p>
                </div>
                <span>
                  <Link to="/help-center-page" target="_blank">
                    <LuBadgeHelp size={25} />
                  </Link>
                </span>
              </div>
              <div>
                <button className="rounded fs-5 fw-semibold border-0 px-5 py-2">
                  Billing Portal
                  <span>
                    <GoArrowUpRight size={22} />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BillingAndPlans

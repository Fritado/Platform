import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import OtpInput from 'react-otp-input'
import AuthFooter from '../common/AuthFooter'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { AUTH_API_ROUTES } from '../../services/APIURL/Apis'
import { toast } from 'react-hot-toast'
import Logo from '../../../assets/images/logo2.png'

const VerifyOtp = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const { user: signUpdata } = useSelector((state) => state.auth)
  const userEmail = signUpdata.email
  //console.log('signUpdata email ', signUpdata.email)
 
  
  useEffect(() => {
    // Only allow access of this route when user has filled the signup form
    if (!signUpdata) {
      navigate('/signup')
    }
  }, [signUpdata])
  const handleVerifyAndSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { firstname, lastname, email, password, contactNumber } = signUpdata
      const signupRes = await axios.post(AUTH_API_ROUTES.SIGNUP, {
        firstname,
        lastname,
        email,
        password,
        confirmPassword: password,
        contactNumber,
        otp,
      })
      if (signupRes.data.success) {
        const { newUser, token } = signupRes.data
        //dispatch(loginUser({ user: newUser, token }));
        toast.success('Your account has been successfully created.')
        navigate('/login')
      } else {
        toast.error(signupRes.data.message || 'Registration unsuccessful. Please try again.')
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error("We're experiencing some technical difficulties. Please try again later.")
      }
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async (e) => {
    e.preventDefault()
    const resendOtpUrl = `${AUTH_API_ROUTES.SEND_OTP}`
    try {
      const resendOtpRes = await axios.post(resendOtpUrl, { email:userEmail })
      console.log(resendOtpRes)
      //  setEmail(resendOtpRes.data.email);
      if (resendOtpRes.data.success) {
        toast.success('OTP sent successfully.')
      } else {
        toast.error(res.data.message || 'Failed to send OTP. Please try again.')
      }
    } catch (error) {
      toast.error("We're experiencing some technical difficulties. Please try again later.")
      console.log(error)
    } 
  }
  return (
    <div className="container">
      <div className="d-flex flex-column mx-auto mt-5">
        <div className="otp d-flex flex-column mx-auto my-4 py-4 auth px-5 bg-white" style={{ maxWidth: "420px" }}>
          <div className="text-left">
            <div className="brand-logo">
              <img
                src={Logo}
                alt="logo"
                className="d-flex mx-auto align-items-center justify-content-center"
                style={{ maxWidth: "100%" }}
              />
            </div>
            <h4>Please check your email </h4>
            <h6 className="fw-normal">Confirm your email address to get started with Fritado!</h6>
            <p>{`We have sent an email confirmation OTP to`} <strong>{userEmail}</strong></p>
            <p>If you do not receive anything right away, please check your spam folder or contact our support.</p>
            <Link to="/register" className="text-color">
              <p className="fw-semibold">Wrong email address?</p>
            </Link>
          </div>
          <form className="pt-" onSubmit={handleVerifyAndSignup}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  className="w-100 p-2 border border-bottom-3 rounded text-center"
                  style={{ maxWidth: "50px" }}
                />
              )}
              containerStyle={{
                justifyContent: 'space-between',
                gap: '0 6px',
                marginTop: '10px',
              }}
            />
            <div className="mt-2 font-weight-light text-left">
              <p className="pt-4" style={{ fontSize: '16px' }}>
                Issue with the code?{' '}
                <strong onClick={handleResendOtp} style={{ cursor: 'pointer' }}>
                  Resend code
                </strong>
              </p>
              <button
                type="submit"
                disabled={!otp}
                className="mt-2 btn btn-primary btn-lg font-weight-medium auth-form-btn w-100"
              >
                {!loading ? 'VERIFY OTP' : 'VERIFYING...'}
              </button>
            </div>
          </form>
        </div>
        <div className="d-flex mx-auto">
            <div className="mt-5 custom-margin">
              <h6 className="my-2 fw-bolder">Authorized Users Only</h6>
              <p className="text-justify">
                Step into Fritado AI's secure systems, reserved for authorized users. We prioritize
                safeguarding sensitive data and detecting any unauthorized activity. By using our
                systems, you agree to monitoring and potential sharing of evidence with law
                enforcement in case of criminal activity. Your continued use implies acceptance of
                our Privacy Policy and Terms and Conditions. If you don't agree, please close your
                browser window.
              </p>
            </div>
          </div>
        <AuthFooter />
      </div>
    </div>
  )
}

export default VerifyOtp

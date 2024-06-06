import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OtpInput from 'react-otp-input'
import AuthFooter from '../common/AuthFooter'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { AUTH_API_ROUTES } from '../../services/APIURL/Apis'
import { toast } from 'react-hot-toast'

const VerifyOtp = () => {
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const { user: signUpdata } = useSelector((state) => state.auth)
  const navigate = useNavigate()
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
        toast.success('Signup successful!')
        navigate('/login')
      } else {
        toast.error(signupRes.data.message || 'Signup failed. Please try again.')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async (e) => {
    e.preventDefault()
    const resendOtpUrl = `${AUTH_API_ROUTES.SEND_OTP}`
    try {
      const resendOtpRes = await axios.post(resendOtpUrl, { email: userEmail })
      //  console.log(resendOtpRes)
      //  setEmail(resendOtpRes.data.email);
      if (resendOtpRes.data.success) {
        toast.success('OTP sent successfully.')
      } else {
        toast.error(res.data.message || 'Failed to send OTP. Please try again.')
      }
    } catch (error) {
      toast.error('Failed to send otp. Please try again.')
      console.log(error)
    }
  }
  return (
    <div>
      <div className="d-flex flex-column mx-auto ">
        <div className="otp  d-flex flex-column mx-auto align-items-start my-5 justify-content-center px-4 py-5 auth px-0 bg-white">
          <div className="">
            <h1 className=" text-color font-weight-bold ">Verify account creation code</h1>
            <p>{`A verification code has been sent to your ${userEmail}`}</p>
            <Link to="/register" className="text-color">
              <p>Change email id</p>
            </Link>
          </div>
          <form className="pt-2" onSubmit={handleVerifyAndSignup}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  className="w-25 p-2 border border-bottom-3 rounded text-center"
                />
              )}
              containerStyle={{
                justifyContent: 'space-between',
                gap: '0 6px',
                marginTop: '20px',
              }}
            />
            <div className="mt-4 font-weight-light">
              <p className="pt-4 cursor-pointer" style={{ fontSize: '16px' }}>
                Issue with the code ? <strong onClick={handleResendOtp}>Resend code </strong>
              </p>
              <button
                type="submit"
                disabled={!otp}
                className="mt-2 btn btn-primary btn-lg font-weight-medium auth-form-btn"
              >
                {!loading ? 'Verify Otp' : 'Verifing...'}
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
              enforcement in case of criminal activity. Your continued use implies acceptance of our
              Privacy Policy and Terms and Conditions. If you don't agree, please close your browser
              window.
            </p>
          </div>
        </div>
        <AuthFooter />
      </div>
    </div>
  )
}

export default VerifyOtp

import React, {useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import OtpInput from 'react-otp-input'
import AuthFooter from '../common/AuthFooter'
import { useDispatch, useSelector } from 'react-redux'
import { signUpdata ,loginUser} from '../../../slice/authSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AUTH_API_ROUTES } from '../../services/APIURL/Apis';
import { toast } from 'react-hot-toast';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('')
  const [email, setEmail] = useState('')
  const { user:signUpdata } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userEmail = signUpdata.email;
  //console.log('signUpdata email ', signUpdata.email)
  useEffect(() => {
    // Only allow access of this route when user has filled the signup form
    if (!signUpdata) {
      navigate('/signup')
    }
  }, [signUpdata])
  const handleVerifyAndSignup = async (e) => {
    e.preventDefault()
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
        const { newUser, token } = signupRes.data;
        //dispatch(loginUser({ user: newUser, token })); 
        toast.success('Signup successful!')
        navigate('/login')
      } else {
        toast.error(signupRes.data.message || 'Signup failed. Please try again.')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
      console.error(error)
    }
  }
  return (
    <div>
      <div className="d-flex flex-column mx-auto ">
        <div className="otp  d-flex flex-column mx-auto align-items-start my-5 justify-content-center px-4 py-5 auth px-0 bg-white">
          <div className="">
            <h1 className=" text-color font-weight-bold ">Verify account creation code</h1>
            <p>
             { `A verification code has been sent to your ${userEmail}`}
            </p>
            <Link to="/register" className="text-color"> 
            <p>Change email id</p>
            </Link>
          </div>
          <form className="px-" 
          onSubmit={handleVerifyAndSignup}
          >
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
              <p className="pt-4" style={{ fontSize: '16px' }}>
                Issue with the code ? <strong>Resend code </strong>
              </p>
              <button
                type="submit"
                disabled={!otp}
                className="mt-2 btn btn-primary btn-lg font-weight-medium auth-form-btn"
              >
                Verify account
              </button>
            </div>
          </form>
        </div>
        <div className="col-12 col-md-10 col-lg-8 mx-auto">
            <div className="mt-5">
              <h6 className="my-2 fw-bolder">Authorized Users Only</h6>
              <p className="fs-6 text-justify">
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

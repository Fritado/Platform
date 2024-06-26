import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthFooter from '../common/AuthFooter'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setToken } from '../../../slice/tokenSlice'
import Logo from '../../../assets/images/logo2.png'
import { AUTH_API_ROUTES } from '../../services/APIURL/Apis'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const dispatch = useDispatch()

  const handelOnSubmit = async (e) => {
    e.preventDefault()
    try {
      const url = `${AUTH_API_ROUTES.FORGOT_PASSWORD}`
      const res = await axios.post(url, { email })
     // console.log(res)
      //dispatch(setToken(res.data.data.token));
      setEmailSent(true)
      toast.success('Email sent  Successfull')
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        toast.error(error.response.data.message)
      }else{
      toast.error("We're experiencing some technical difficulties. Please try again later.");
      }
      //console.log(error)
    }
  }
  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0 d-flex flex-column mx-auto">
          <div className="col-lg-4 mx-auto pt-4">
            <div className="auth-form-light text-left py-4 px-4 px-sm-5 mt-5">
              <div className="brand-logo">
                <img src={Logo} alt="logo" className="d-flex mx-auto" />
              </div>
              <h5>{!emailSent ? 'Reset your Password' : 'Check email'}</h5>
              <h6 className="fw-normal">
                {!emailSent
                  ? 'Signing up is easy. It only takes a few steps'
                  : `We have sent the reset password email to ${email}`}
              </h6>
              <form onSubmit={handelOnSubmit} className="pt-2">
                {!emailSent && (
                  <div className="form-group">
                    <input
                      required
                      type="email"
                      name="email"
                      value={email}
                      placeholder="Enter Email address"
                      className="form-control form-control-lg"
                      id="exampleInputPassword1"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!email}
                  className="mt-3 btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                >
                  {!emailSent ? 'RESET PASSWORD' : 'Resend Email'}
                </button>
                <div className="text-center mt-4 font-weight-light">
                  <Link to="/login" className="text-color">
                    Need help signing in?
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className="d-flex mx-auto">
            <div className="mt-5 custom-margin">
              <h6 className="my-2 fw-bolder">Authorized Users Only</h6>
              <p className=" text-justify">
                Step into Fritado AI's secure systems, reserved for authorized users. We
                prioritize safeguarding sensitive data and detecting any unauthorized activity.
                By using our systems, you agree to monitoring and potential sharing of evidence
                with law enforcement in case of criminal activity. Your continued use implies
                acceptance of our Privacy Policy and Terms and Conditions. If you don't agree,
                please close your browser window.
              </p>
            </div>
          </div>
          <AuthFooter />
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword

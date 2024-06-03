import React, { useState, useEffect } from 'react'
import AuthFooter from '../common/AuthFooter'
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import Logo from '../../../assets/images/logo2.png'
import { AUTH_API_ROUTES } from '../../services/APIURL/Apis'

const NewPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { token } = useParams()
  //console.log("token value coming from reset-pasword", token);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })
  const { password, confirmPassword } = formData
  const handleOnChange = ({ currentTarget: input }) => {
    console.log('input typing value', input.value)
    setFormData({ ...formData, [input.name]: input.value })
  }

  const handlePasswordReset = async (e) => {
    e.preventDefault()
    try {
      let url = `${AUTH_API_ROUTES.NEW_PASSWORD}`
      console.log('resetpassowrd url ', url)
      const res = await axios.post(url, {
        password,
        token,
      })
      console.log('resdata', res)
      toast.success('Password Reset Successfull')
      navigate('/login')
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error('Token expired. Please generate a new link.')
      } else {
        toast.error('Error resetting password')
      }
      console.error(error)
    }
  }

  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0 d-flex flex-column mx-auto">
          <div className="col-lg-4 mx-auto pt-5">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5 mt-4">
              <div className="brand-logo">
                <img src={Logo} alt="logo" className="d-flex mx-auto" />
              </div>
              <h5>New here?</h5>
              <h6 className="fw-normal">Signing up is easy. It only takes a few steps</h6>
              <form className="pt-3">
                <div className="form-group">
                  <input
                    required
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    className="form-control form-control-lg"
                    id="exampleInputPassword1"
                    onChange={handleOnChange}
                  />
                </div>
                {/* <div className="form-group">
                  <input
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    name="confirmPassword"
                    className="form-control form-control-lg"
                    id="exampleInputPassword1"
                    placeholder="Re-type Password"
                    onChange={handleOnChange}
                  />
                </div> */}

                <button
                  onClick={handlePasswordReset}
                  className="mt-3 btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                >
                  RESET PASSWORD
                </button>
                <div className="text-center mt-4 font-weight-light">
                  <Link to="/signup" className="text-color">
                    Need help signing in?
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className="col-12 col-md-10 col-lg-8 mx-auto">
            <div className="mt-5">
              <h6 className="my-2 fw-bolder">Authorized Users Only</h6>
              <p className="fs-6 text-justify">
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

export default NewPassword

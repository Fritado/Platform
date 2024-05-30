import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser, signUpdata } from '../../../slice/authSlice'
import AuthFooter from '../../views/common/AuthFooter'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Logo from '../../../assets/images/logo2.png'
import { useNavigate } from 'react-router-dom'
import { AUTH_API_ROUTES } from '../../services/APIURL/Apis'

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    isVisible: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { firstname, lastname, email, password, confirmPassword, isVisible } = formData

  const handleOnChange = (event) => {
    // console.log(event.target.value);
    const { name, value, checked, type } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }
  //handle from submission
  const handleOnSubmit = async (e) => {
    e.preventDefault()

    try {
      const url = `${AUTH_API_ROUTES.SIGNUP}`
      const res = await axios.post(url, formData)
      toast.success('Signup Successfull')
      console.log('res', res)

      const signupData = res.data.newUser
      navigate('/login')

      //setting signup data to store to be used after otp verification
      dispatch(signUpdata(signupData))

      //console.log(signupData)

      //Reset form data
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
    } catch (error) {
      toast.error('Failed to sign up. Please try again.')
      console.log(error)
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
              <form onSubmit={handleOnSubmit} className="pt-3">
                <div className="form-group d-flex gap-3">
                  <input
                    required
                    type="text"
                    name="firstname"
                    value={firstname}
                    onChange={handleOnChange}
                    className="form-control form-control-lg mr-2 "
                    id="exampleInputUsername1"
                    placeholder="Firstname"
                  />
                  <input
                    required
                    type="text"
                    name="lastname"
                    value={lastname}
                    onChange={handleOnChange}
                    className="form-control form-control-lg ml-2"
                    id="exampleInputUsername1"
                    placeholder="Lastname"
                  />
                </div>
                <div className="form-group">
                  <input
                    required
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleOnChange}
                    className="form-control form-control-lg"
                    id="exampleInputEmail1"
                    placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleOnChange}
                    className="form-control form-control-lg"
                    id="exampleInputPassword1"
                  />
                </div>
                <div className="form-group">
                  <input
                    required
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleOnChange}
                    className="form-control form-control-lg"
                    id="exampleInputPassword1"
                    placeholder="Re-type Password"
                  />
                </div>
                <div className="">
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input
                        type="checkbox"
                        name="isVisible"
                        value="terms-condition"
                        onChange={handleOnChange}
                        checked={isVisible}
                        className="form-check-input"
                      />
                      <i className="input-helper"></i>I agree to all Terms & Conditions
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={
                    !firstname || !lastname || !email || !password || !confirmPassword || !isVisible
                  }
                  className="mt-3 btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                >
                  SIGN UP
                </button>
                <div className="text-center mt-4 font-weight-light">
                  Already have an account?{' '}
                  <Link to="/login" className="text-color">
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div>
            <div style={{ marginLeft: '10rem', marginRight: '10rem' }} className="mt-5">
              <h6 className="my-2 fw-bolder">Authorized Users Only</h6>

              <div>
                <p className="fs-6 text-justify">
                  Step into Fritado AI's secure systems, reserved for authorized users. We
                  prioritize safeguarding sensitive data and detecting any unauthorized activity. By
                  using our systems, you agree to monitoring and potential sharing of evidence with
                  law enforcement in case of criminal activity. Your continued use implies
                  acceptance of our Privacy Policy and Terms and Conditions. If you don't agree,
                  please close your browser window.
                </p>
              </div>
            </div>
          </div>
          <AuthFooter />
        </div>
      </div>
    </div>
  )
}

export default Register

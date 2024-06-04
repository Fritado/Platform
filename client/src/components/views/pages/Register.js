import React, {useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser, signUpdata } from '../../../slice/authSlice'
import AuthFooter from '../../views/common/AuthFooter'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Logo from '../../../assets/images/logo2.png'
import { useNavigate } from 'react-router-dom'
import { AUTH_API_ROUTES } from '../../services/APIURL/Apis'
import CountryCode from '../data/CountryCode.json'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import TermsConditionModal from './TermsConditionModal'

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  //const [isFormValid, setIsFormValid] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [focusedField, setFocusedField] = useState('')
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    country_Code: '',
    contactNumber: '',
    password: '',
    confirmPassword: '',
  })

  const { firstname, lastname, email, country_Code, contactNumber, password, confirmPassword } =
    formData

  const handleOnChange = (event) => {
    // console.log(event.target.value)
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
  //handle from submission
  const handleOnSubmit = async (e) => {
    e.preventDefault()
    try {
      const fullContactNumber = `${country_Code} ${contactNumber}`.trim()
      const signupData = { ...formData, contactNumber: fullContactNumber, country_Code: undefined }
      dispatch(signUpdata(signupData))

      const url = `${AUTH_API_ROUTES.SEND_OTP}`
      const res = await axios.post(url, { email: signupData.email })
      if (res.data.success) {
        toast.success('OTP sent successfully.')
        navigate('/verify-otp')
      } else {
        toast.error(res.data.message || 'Failed to send OTP. Please try again.')
      }
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        country_Code: '',
        contactNumber: '',
        password: '',
        confirmPassword: '',
      })
    } catch (error) {
      toast.error('Failed to sign up. Please try again.')
      console.log(error)
    }
  }
  const handleModalShow = () => setShowModal(true)
  const handleModalClose = () => setShowModal(false)

  const handleAccept = () => {
    setTermsAccepted(true)
    setShowModal(false)
  }
  const handleDecline = () => {
    setTermsAccepted(false)
    setShowModal(false)
  }
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    const handleOutsideClick = (event) => {
      if (showModal && event.target.closest('.modal-content') === null) {
        setShowModal(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showModal]);

  const isFormValid = () => {
    const isFilled =
      formData.firstname &&
      formData.lastname &&
      formData.email &&
      formData.country_Code &&
      formData.contactNumber &&
      formData.password &&
      formData.confirmPassword;
    return isFilled && termsAccepted;
  };
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
                    placeholder="Firstname"
                  />
                  <input
                    required
                    type="text"
                    name="lastname"
                    value={lastname}
                    onChange={handleOnChange}
                    className="form-control form-control-lg ml-2"
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
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField()}
                    className="form-control form-control-lg"
                    placeholder="Email"
                  />
                  {focusedField === 'email' && (
                    <div className="password-tooltip">
                      <p>Please enter valid email address</p>
                    </div>
                  )}
                </div>
                <div className="form-group d-flex gap-2">
                  <select
                    name="country_code"
                    value={country_Code}
                    onChange={handleOnChange}
                    className="form-control form-control-lg"
                    style={{ width: '3.2rem' }}
                  >
                    {CountryCode.map((element, index) => {
                      return (
                        <option key={index} value={element.code}>
                          {element.code} {element.country}
                        </option>
                      )
                    })}
                  </select>

                  <input
                    required
                    type="tel"
                    name="contactNumber"
                    value={contactNumber}
                    onChange={handleOnChange}
                    className="form-control form-control-lg"
                    placeholder="Contact Number"
                  />
                </div>

                <div className="form-group  position-relative">
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleOnChange}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                    className="form-control form-control-lg"
                  />
                  {focusedField === 'password' && (
                    <div className="password-tooltip">
                      <p>Your password must have:</p>
                      <ul className="text-danger password-list">
                        <li>More than 8 characters</li>
                        <li>Uppercase characters (A-Z)</li>
                        <li>Lowercase characters (a-z)</li>
                        <li>Numbers (0-9)</li>
                        <li>Special characters (~*!@$#%_+.?:,{})</li>
                      </ul>
                    </div>
                  )}
                  <span
                    className="position-absolute top-50 end-0 pe-2 translate-middle-y"
                    onClick={() => setShowPassword((prevShowPassword) => !prevShowPassword)}
                  >
                    {!showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <div className="form-group position-relative">
                  <input
                    required
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleOnChange}
                    className="form-control form-control-lg"
                    placeholder="Re-type Password"
                  />
                  <span
                    className="position-absolute top-50 end-0 pe-2 translate-middle-y"
                    onClick={() =>
                      setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword)
                    }
                  >
                    {!showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <div className="form-group">
                  <p className="text-muted" onClick={handleModalShow} style={{ cursor: 'pointer' }}>
                    I agree to all <span className="text-primary">Terms & Conditions</span>
                  </p>
                </div>
                <button
                  type="submit"
                  //disabled={!isFormValid()}
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
      <TermsConditionModal
        show={showModal}
      //  onClose={() => setShowModal(false)}
        onClose={handleModalClose}
        onAccept={handleAccept}
        onDecline={handleDecline}
      ></TermsConditionModal>
    </div>
  )
}

export default Register

import React, { useEffect, useState, Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signUpdata } from '../../../slice/authSlice'
import AuthFooter from '../../views/common/AuthFooter'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Logo from '../../../assets/images/logo2.png'
import { useNavigate } from 'react-router-dom'
import { AUTH_API_ROUTES } from '../../services/APIURL/Apis'
import CountryCode from '../data/CountryCode.json'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
const TermsConditionModal = lazy(() => import('./TermsConditionModal'))

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [focusedField, setFocusedField] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [emailValid, setEmailValid] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
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
  const [criteriaMet, setCriteriaMet] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  })
  const { firstname, lastname, email, country_Code, contactNumber, password, confirmPassword } =
    formData

  const filteredCountryCodes = CountryCode.filter((element) =>
    [element.code.toLowerCase(), element.country.toLowerCase()].some((text) =>
      text.includes(searchTerm.toLowerCase()),
    ),
  )
  const handleCountryCodeChange = (selectedOption) => {
    // console.log('Selected Country Code:', selectedOption.value)
    setFormData((prevData) => ({
      ...prevData,
      country_Code: selectedOption.value,
    }))
  }

  const countryOptions = CountryCode.map((country) => ({
    value: country.code,
    label: `${country.code} - ${country.country}`,
  }))
  const selectedCountryOption = countryOptions.find((option) => option.value === country_Code)

  useEffect(() => {
    if (!country_Code && countryOptions.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        country_Code: countryOptions[0].value,
      }))
    }
  }, [countryOptions, country_Code])

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  const handleOnChange = (event) => {
    // console.log(event.target.value)
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    if (name === 'email') {
      setEmailValid(validateEmail(value))
    } else if (name === 'country_Code') {
      setSearchTerm(value)
    } else if (name === 'password') {
      const criteria = checkPasswordCriteria(value)
      const criteriaMet = Object.values(criteria).every((criterion) => criterion)
      if (criteriaMet) {
        document.querySelector('.password-tooltip').style.display = 'none'
      } else {
        document.querySelector('.password-tooltip').style.display = 'block'
      }
    }
  }
  //handle from submission
  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (!termsAccepted) {
        toast.error('Please accept the Terms & Conditions')
        setLoading(false)
        return
      }
      const fullContactNumber = `${country_Code} ${contactNumber}`.trim()

      const passwordCriteriaMet = Object.values(criteriaMet).every((criterion) => criterion)
      if (!passwordCriteriaMet) {
        toast.error('Please ensure that your password meets the criteria')
        setLoading(false)
        return
      }
      // Check if password and confirm password match
      if (password !== confirmPassword) {
        toast.error('Password and Confirm Password do not match. Please try again.')
        setLoading(false)
        return
      }
      const signupData = { ...formData, contactNumber: fullContactNumber, termsAccepted }
      // console.log("Signup Data:", signupData);
      dispatch(signUpdata(signupData))

      const url = `${AUTH_API_ROUTES.SEND_OTP}`
      const res = await axios.post(url, { email: signupData.email })
      // console.log('res', res)
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
        termsAccepted: false,
      })
      setTermsAccepted(false)
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error("We're experiencing some technical difficulties. Please try again later.")
      }
      // console.log(error)
    } finally {
      setLoading(false)
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
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    const handleOutsideClick = (event) => {
      if (showModal && event.target.closest('.modal-content') === null) {
        setShowModal(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [showModal])

  const checkPasswordCriteria = (password) => {
    return {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[~*!@$#%_+.?:,{}]/.test(password),
    }
  }
  useEffect(() => {
    setCriteriaMet(checkPasswordCriteria(password))
  }, [password])

  useEffect(() => {
    if (focusedField === 'email') {
      if (emailValid) {
        document.querySelector('.email-tooltip').style.display = 'none'
      } else {
        document.querySelector('.email-tooltip').style.display = 'block'
      }
    }
  }, [emailValid, focusedField])

  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0 d-flex flex-column mx-auto">
          <div className="col-lg-4 mx-auto pt-4">
            <div className="auth-form-light text-left py-4 px-4 px-sm-5 mt-5">
              <div className="brand-logo">
                <img src={Logo} alt="logo" className="d-flex mx-auto" />
              </div>
              <h5>New here?</h5>
              <h6 className="fw-normal">Signing up is easy. It only takes a few steps</h6>
              <form onSubmit={handleOnSubmit} className="pt-2">
                <div className="form-group d-flex gap-2">
                  <input
                    required
                    type="text"
                    name="firstname"
                    value={firstname}
                    onChange={handleOnChange}
                    className="form-control form-control-lg mr-2 "
                    placeholder="First Name"
                  />
                  <input
                    required
                    type="text"
                    name="lastname"
                    value={lastname}
                    onChange={handleOnChange}
                    className="form-control form-control-lg ml-2"
                    placeholder="Last Name"
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
                    <div
                      className="password-tooltip email-tooltip"
                      style={{ display: emailValid ? 'none' : 'block' }}
                    >
                      <p>Please enter valid email address</p>
                    </div>
                  )}
                </div>
                <div className="form-group d-flex gap-2">
                  <select
                    // name="country_code"
                    value={country_Code}
                    // onChange={handleOnChange}
                    options={countryOptions}
                    //value={selectedCountryOption}
                    onChange={(e) => handleCountryCodeChange({ value: e.target.value })}
                    className="form-control form-control-lg"
                    style={{ width: '3.5rem' }}
                    size={filteredCountryCodes.length > 5 ? 1 : filteredCountryCodes.length}
                  >
                    {filteredCountryCodes.map((element, index) => (
                      <option
                        key={index}
                        value={element.code}
                        isSearchable={true}
                        style={{
                          backgroundColor:
                            searchTerm &&
                            (element.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              element.country.toLowerCase().includes(searchTerm.toLowerCase()))
                              ? 'yellow'
                              : 'white',
                        }}
                      >
                        {element.code} {element.country}
                      </option>
                    ))}
                  </select>

                  <input
                    required
                    type="tel"
                    name="contactNumber"
                    value={contactNumber}
                    onChange={handleOnChange}
                    className="form-control form-control-lg"
                    placeholder="Mobile Number"
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
                        <li style={{ color: criteriaMet.minLength ? 'green' : 'red' }}>
                          More than 8 characters
                        </li>
                        <li style={{ color: criteriaMet.hasUppercase ? 'green' : 'red' }}>
                          Uppercase characters (A-Z)
                        </li>
                        <li style={{ color: criteriaMet.hasLowercase ? 'green' : 'red' }}>
                          Lowercase characters (a-z)
                        </li>
                        <li style={{ color: criteriaMet.hasNumber ? 'green' : 'red' }}>
                          Numbers (0-9)
                        </li>
                        <li style={{ color: criteriaMet.hasSpecialChar ? 'green' : 'red' }}>
                          Special characters (~*!@$#%_+.?:,{})
                        </li>
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
                    I agree to all{' '}
                    <span style={{ color: ' rgba(47,130,162,.859)' }}>Terms & Conditions</span>
                  </p>
                </div>
                <button
                  type="submit"
                  id="signup-btn"
                  disabled={
                    !firstname ||
                    !lastname ||
                    !email ||
                    !password ||
                    !confirmPassword ||
                    !contactNumber ||
                    !termsAccepted
                  }
                  className="mt-3 btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                >
                  {!loading ? 'SIGNUP' : 'PROCESSING...'}
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
      <Suspense fallback={<div>Loading...</div>}>
        <TermsConditionModal
          show={showModal}
          onClose={handleModalClose}
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      </Suspense>
    </div>
  )
}

export default Register

import React, { useState, useEffect } from 'react'
import Header from '../common/Header'
import AuthFooter from '../common/AuthFooter'
import Spinner from '../common/Spinner'
import Logo from '../../../assets/images/logo2.png'
import { Link, useNavigate } from 'react-router-dom'
import { industryOptions } from '../data/industryTypeData'
import { saveBusinessInfo } from '../../services/onBoarding/businessProfileApi'
import {updateProgress} from "../../services/Auth/AuthApi"

const BusinessInfo = () => {
  const [loading, setLoading] = useState(false)
  const [industryType, setIndustryType] = useState('')
  const [companyName, setCompanyName] = useState('')
  const navigate = useNavigate()

   const handleSaveBusinessInfo = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    try { 
      await updateProgress('/business-info', false)   
      const savedData = await saveBusinessInfo(companyName, industryType, token);   
      navigate('/business-domain')
    } catch (error) {
      console.log('Error while saving business info:', error)
    } 
  }
  return (
    <div>
      <Header />
      <div className="mt-2 d-flex align-items-center mx-auto auth px-0">
        <div className="row w-100 d-flex flex-column mx-auto mx-0">
          <div className="col-lg-4 mx-auto pt-5">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5 mt-4">
              <div className="brand-logo">
                <img src={Logo} alt="logo" className="d-flex mx-auto" />
              </div>
              <h5>Let's know about your business</h5>
              <h6 style={{ textAlign: 'justify' }} className="fw-normal">
                Hello! I'm Fritado AI, your dedicated assistant designed to enhance your business's
                SEO. Just share your URL, and I'll handle automatic weekly SEO optimization. Ready
                to expand your customer reach? Let's begin!
              </h6>
              <form className="pt-3" onSubmit={handleSaveBusinessInfo}>
                <div className="form-group d-flex flex-row">
                  <input
                    required
                    type="text"
                    name="companyName"
                    value={companyName}
                    placeholder="Business name"
                    className="form-control form-control-lg"
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div className="form-group d-flex flex-row">
                  <select
                    required
                    name="industryType"
                    value={industryType}
                    className="form-control form-control-lg"
                    id="industryChooser-editLocationForm"
                    onChange={(e) => setIndustryType(e.target.value)}
                  >
                    <option value="">Select Industry</option>
                    {industryOptions.map((option) => (
                      <option key={option.value} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <button

                  type="submit"
                  className="mt-3 btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                  
                >
                  SUBMIT
                </button>

                <div className="text-center mt-4 font-weight-light">
                  <Link to="/help-center-page" target="_blank" className="text-color">
                    Need help ?
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <AuthFooter />
        </div>
      </div>
    </div>
  )
}

export default BusinessInfo

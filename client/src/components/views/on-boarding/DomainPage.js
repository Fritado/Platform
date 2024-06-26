import React, { useState , useEffect } from 'react'
import { Link } from 'react-router-dom'
import AuthFooter from '../common/AuthFooter'
import { useNavigate } from 'react-router-dom'
import Spinner from '../common/Spinner'
import Header from '../common/Header'
import Logo from '../../../assets/images/logo2.png'
import {
  checkIfProjectUrlExists,
  savingDomainUrl,
  fetchPageSpeedData,
} from '../../services/BusinessDomain/domain'
import { toast } from 'react-hot-toast'
import {updateProgress} from "../../services/Auth/AuthApi"

const DomainPage = () => {
  const [urlInput, setUrlInput] = useState('')
  const [pageSpeedData, setPageSpeedData] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  // const modifiedUrlInput = `https://${urlInput}` //https://seo.com
  const PageSpeedApiKey = 'AIzaSyCHCEQO7ge4Rs6ABVtlcOWiejNFp5T9LWI';

  const handleOnChange = (e) => {
    //  console.log(e.target.value);
    const inputPrefix = e.target.value.trim() //seo.com
    setUrlInput(inputPrefix.startsWith('https://') ? inputPrefix.slice(8) : inputPrefix)
  }
 const upatePageHandler = async()=>{
  await updateProgress('/business-domain', false);
 }
 useEffect(()=>{
  upatePageHandler();
 },[]);
  
  const fetchData = async (e) => {
    e.preventDefault()
    setLoading(true)
    const modifiedUrlInput = `https://${urlInput}`

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('Token not found')
      }
      //await updateProgress('/business-domain', false)   
      const exists = await checkIfProjectUrlExists(modifiedUrlInput, token)
      if (!exists) {
        await savingDomainUrl(modifiedUrlInput, token)
      }
      const data = await fetchPageSpeedData(modifiedUrlInput, PageSpeedApiKey)
      setPageSpeedData(data)
      localStorage.setItem('modifiedUrlInput', modifiedUrlInput)
      navigate('/pagespeed-insights', { state: { pageSpeedData: data } })
   
    } catch (error) {
      console.error('Error:', error)
      toast.error("We're experiencing some technical difficulties. Please try again later.")
      setLoading(false)
    }
  }

  return (
    <div>
      <Header />
      <div className="mt-2 d-flex align-items-center mx-auto auth px-0">
        {loading ? (
          <div className=" pt-3 mx-auto position-fixed top-50 start-50 translate-middle">
            <div className="d-flex flex-column mx-auto justify-content-center">
              <Spinner style={{ marginBottom: '25px' }} />
            </div>
            <h3>
              Please wait while we analyze the website.
              <h3> This may take a few moments. Thank you for your patience. </h3>
            </h3>
          </div>
        ) : (
          <div className="row w-100 d-flex flex-column mx-auto mx-0">
            <div className="col-lg-4 mx-auto pt-5">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5 mt-4">
                <div className="brand-logo">
                  <img src={Logo} alt="logo" className="d-flex mx-auto" />
                </div>
                <h5>New here?</h5>
                <h6 style={{ textAlign: 'justify' }} className="fw-normal">
                  Hello! I'm Fritado AI, your dedicated assistant designed to enhance your
                  business's SEO. Just share your URL, and I'll handle automatic weekly SEO
                  optimization. Ready to expand your customer reach? Let's begin!
                </h6>
                <form className="pt-3">
                  <div className="form-group d-flex flex-row">
                    <div className="d-flex align-items-center px-2 text-center">
                      <span className="fs-5">https://</span>
                    </div>
                    <input
                      required
                      type="text"
                      name="urlInput"
                      value={urlInput}
                      onChange={handleOnChange}
                      placeholder="fritado.com"
                      className="form-control form-control-lg"
                    />
                  </div>

                  <button
                    onClick={fetchData}
                    type="submit"
                    className="mt-3 btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                  >
                    ANALYSE
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
        )}
      </div>
    </div>
  )
}

export default DomainPage

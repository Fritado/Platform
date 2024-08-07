import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FaRegIdCard, FaKey } from 'react-icons/fa'
import { FcCustomerSupport } from 'react-icons/fc'
import { websiteTypeData } from '../../data/ProviderList'
import PhpIntegration from './PHP/PhpIntegration'
import { saveWebsiteType } from '../../../services/ConnectWebsite/WebsiteSelection'
import { updateWebhookUrl } from '../../../services/ConnectWebsite/WebsiteSelection'
import WordPressIntegration from './WordPress/WordPressIntegration'

const WebsiteIntegrationForm = ({ title, appDetails, webhookUrl ,setWebhookUrl}) => {
  const domainName = appDetails[1].value;
  const [currentWebhookUrl, setCurrentWebhookUrl] = useState(webhookUrl);
  const [formData, setFormData] = useState({
    webType: 'Content management system',
    tech: '',
  })
  const DefaultIntegration = () => (
    <div className="my-3 bg-white">
      <div className="p-4 my-5 text-center">
        <h4>Currently working on integration</h4>
      </div>
    </div>
  )

  const handleWebsiteTypeChange = (event) => {
    const selectedWebType = event.target.value
    setFormData({ ...formData, webType: selectedWebType, tech: '' })
  }

  const handleWebsiteTypeTechChange = async (event) => {
    const selectedTech = event.target.value
    setFormData({ ...formData, tech: selectedTech })
    try {
      const { webType } = formData;
    //  console.log(webType, selectedTech, domainName, "Payload to updateWebhookUrl");
      const updatedWebhookUrl = await updateWebhookUrl(webType, selectedTech, domainName);
      setCurrentWebhookUrl(updatedWebhookUrl);
      setWebhookUrl(updatedWebhookUrl)
    } catch (error) {
      console.error('Error updating webhook URL:', error);
    }
  }

  // const handleSave = async () => {
  //   try {
  //     const { webType, tech } = formData
  //     const savedData = await saveWebsiteType({ websiteType: webType, technology: tech })
  //     console.log('Website type saved successfully:', savedData)
  //   } catch (error) {
  //     console.error('Error while saving website type:', error)
  //   }
  // }

  return (
    <div className="container mx-auto">
      <section className="container">
        <div className="d-flex flex-column">
          <div className="d-flex flex-row align-items-center mb-4">
            {title.icon}
            <h1 className="text-dark fw-normal ps-3 mb-0">{title.text}</h1>
          </div>
          <div className="d-flex flex-wrap gap-3">
            {/* App details */}
            <div className="bg-white p-3" style={{ flex: '1' }}>
              {appDetails.map((detail, index) => (
                <div key={index}>
                  <p className="fs-6">
                    <strong>{detail.label}:</strong> {detail.value}
                  </p>
                </div>
              ))}
            </div>
            {/* Valid oauth redirect url */}
            <div className="col-lg-6 bg-white p-3">
              <p className="fs-6">
                <strong>Looking for assistance? Reach out to our dedicated support team!</strong>
              </p>
              <span className=" d-flex align-items-center mx-auto justify-content-center">
                <FcCustomerSupport size={85} />
              </span>
            </div>
          </div>

          {/* Your existing UI code */}
          <div className="my-3 bg-white"> 
            <form className="p-3">
              <div className="row mb-3">
                <h6 className='fw-semibold pt-2'>Choose your website technology</h6>
                <div className="col">
                  <label htmlFor="appId" className="form-label pe-2">
                    <FaRegIdCard /> Website Type
                  </label>
                  <select
                    value={formData.webType}
                    onChange={handleWebsiteTypeChange}
                    className="p-2 rounded me-2"
                  >
                    {websiteTypeData.map((webType) => (
                      <option key={webType.name} value={webType.name}>
                        {webType.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <label htmlFor="appSecret" className="form-label pe-2">
                    <span className="pe-1">
                      <FaKey />{' '}
                    </span>
                    Website Technology
                  </label>
                  <select
                    value={formData.tech}
                    onChange={handleWebsiteTypeTechChange}
                    className="p-2 rounded me-2"
                  >
                    {websiteTypeData
                      .find((item) => item.name === formData.webType)
                      ?.technology.map((tech) => (
                        <option key={tech} value={tech}>
                          {tech}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </form>
          </div>

          {/* Pass websiteData to PhpIntegration or NodeIntegration */}
          {formData.tech === 'PHP' && (
            <PhpIntegration
              webhookUrl={currentWebhookUrl}
              websiteData={formData}
              saveWebsiteType={saveWebsiteType}
            />
          )}
         
          {formData.tech === 'Wordpress' && (
            <WordPressIntegration
             webhookUrl={currentWebhookUrl}
              websiteData={formData}
              saveWebsiteType={saveWebsiteType}
            />
          )}
           {formData.tech && formData.tech !== 'PHP' && formData.tech !== 'Wordpress'  && <DefaultIntegration />}
          {/* <button className="btn btn-primary" onClick={handleSave}>
            Save Website Type
          </button> */}
        </div>
      </section>
    </div>
  )
}

WebsiteIntegrationForm.propTypes = {
  title: PropTypes.shape({
    icon: PropTypes.element.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  appDetails: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  webhookUrl: PropTypes.string.isRequired,
  
}

export default WebsiteIntegrationForm

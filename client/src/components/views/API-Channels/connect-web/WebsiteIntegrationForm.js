import React , {useState} from 'react'
import PropTypes from 'prop-types';
import { MdEditDocument } from 'react-icons/md';
import { FaRegIdCard, FaKey } from 'react-icons/fa';
import { AiFillSave } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';
import { VscDebugBreakpointUnsupported } from 'react-icons/vsc';
import { websiteTypeData } from '../../data/ProviderList'
import { Link } from 'react-router-dom';

const WebsiteIntegrationForm = ({title,
    appDetails,
    oauthRedirectUris,
    onSave,
    onCancel}) => {

      const [{ webType, tech }, setData] = useState({
        webType: 'Content management system',
        tech: '',
      })
    
      const website = websiteTypeData.map((webType) => (
        <option key={webType.name} value={webType.name}>
          {webType.name}
        </option>
      ))
    
      const websiteTech = websiteTypeData
        .find((item) => item.name === webType)
        ?.technology.map((tech) => (
          <option key={tech} value={tech}>
            {tech}
          </option>
        ))
    
      function handleWebsiteTypeChange(event) {
        setData((data) => ({ tech: '', webType: event.target.value }))
      }
    
      function handleWebsiteTypeTechChange(event) {
        setData((data) => ({ ...data, tech: event.target.value }))
      }
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
          {/* Valid oauth redirect uri */}
          <div className="col-lg-6 bg-white p-3">
            <p className="fs-6">
              <strong>Valid oauth redirect uri :</strong>
            </p>
            {oauthRedirectUris.map((uri, index) => (
              <p key={index}>{uri}</p>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="my-3 bg-white">
          <div className="border-bottom p-4">
            <span>
              <VscDebugBreakpointUnsupported size={30} />
            </span>{' '}
            Website details
          </div>
          <form className="p-3">
            <div className="mb-3">
              <label htmlFor="appName" className="form-label">
                <MdEditDocument /> Website Name
              </label>
              <input type="text" className="form-control" id="appName" />
            </div>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="appId" className="form-label">
                  <FaRegIdCard /> Website Type
                </label>
                
              <select
                value={webType}
                onChange={handleWebsiteTypeChange}
                className="p-2 rounded me-2"
              >
                {website}
              </select>
           
              </div>
              <div className="col">
                <label htmlFor="appSecret" className="form-label">
                  <span className="pe-1">
                    <FaKey />{' '}
                  </span>
                Website Technology
                </label>
                <select
                value={tech}
                onChange={handleWebsiteTypeTechChange}
                className="p-2 rounded me-2"
              >
                {websiteTech}
              </select>
              </div>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-end">
              <button className="border-0 rounded px-4 py-3" onClick={onSave}>
                <AiFillSave size={20} />
              Connect
              </button>
              <button className="border-0 rounded px-4 py-3" onClick={onCancel}>
                <RxCross2 size={20} />
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
  )
}

WebsiteIntegrationForm.propTypes = {
    title: PropTypes.shape({
      icon: PropTypes.element.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired,
    appDetails: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    ).isRequired,
    oauthRedirectUris: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };
  

export default WebsiteIntegrationForm

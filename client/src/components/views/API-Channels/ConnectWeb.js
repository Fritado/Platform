import React, { useState } from 'react'
import ConnectOverview from './ConnectOverview'
import { websiteTypeData } from '../data/ProviderList'
import { Link } from 'react-router-dom'

const ConnectWeb = () => {
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
    <div>
      <ConnectOverview />
      <div className="bg-white mx-4">
        <div className="row ms-3">
          <div className="col-lg-6 d-flex flex-column  p-3">
            <h2 className="">Provider</h2>
          </div>
        </div>
        <form className="d-flex flex-column ms-4 p-2" style={{ maxWidth: '568px' }}>
          <div className="d-flex flex-row">
            <div>
              <select
                value={webType}
                onChange={handleWebsiteTypeChange}
                className="p-2 rounded me-2"
              >
                {website}
              </select>
            </div>

            <div>
              <select
                value={tech}
                onChange={handleWebsiteTypeTechChange}
                className="p-2 rounded me-2"
              >
                {websiteTech}
              </select>
            </div>
          </div>
        </form>
        <div className=' ms-4 p-2'>
          <button className="btn-db">Connect</button>
        </div>
      </div>
    </div>
  )
}

export default ConnectWeb

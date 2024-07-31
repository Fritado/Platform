import React from 'react'
import { MdEmail } from "react-icons/md";

const EmailAutomation = () => {
  return (
    <div className="mx-4">
      <div className="d-sm-flex " style={{ marginLeft: '0px', marginBottom: '10px' }}>
        <div className="d-flex flex-row">
          <span className="pe-2"><MdEmail size={26}/></span>
          <h2 className="text-dark fw-normal pe-3">Email Automation</h2>
        </div>
      </div>
    </div>
  )
}

export default EmailAutomation

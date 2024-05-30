import React, { useEffect } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { PiFileLockBold } from 'react-icons/pi'

const BillingModelBox = ({ closeModel }) => {
  useEffect(() => {
    document.body.style.overflowY = 'hidden'
    return () => {
      document.body.style.overflowY = 'scroll'
    }
  }, [])
  return (
    <div className="modal-content">
      <div className="bg-white container py-2 px-3 d-flex flex-column border rounded">
        <div className="d-flex flex-row justify-content-between border-bottom py-3">
          <h5 className="text-center">Cancel subscription</h5>
          <span className="bg-body-secondary border-0 rounded p-1" onClick={closeModel}>
            <RxCross2 size={22} />
          </span>
        </div>
        <div className="d-flex flex-column justify-content-center ">
          <div className="text-center border-bottom py-3 ">
            <span className="py-2">
              <PiFileLockBold size={50} color="rgba(47, 130, 162, 0.859)" />
            </span>
            <h6 className="py-2">
              Are you sure you want to cancel? You'll lose access to premium features and data.
              Contact support for help.
            </h6>
          </div>
          <button className="btn-db bg-danger px-4 py-2">I want to cancel my subscription</button>
        </div>
      </div>
    </div>
  )
}

export default BillingModelBox

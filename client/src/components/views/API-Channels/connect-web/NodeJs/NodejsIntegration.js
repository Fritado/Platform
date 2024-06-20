import React from 'react'

const NodejsIntegration = () => {
  return (
    <div>
      <div className="my-3 bg-white">
        <div className="p-4">
          <strong>Step 2 </strong>
        </div>
        <div className="p-4">
          <p> Download webhook file and upload in your main folder</p>

          <p>Webhook.Node</p>
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-end">
          <button className="border-0 rounded px-4 py-3">
            Verify upload
          </button>
          <button className="border-0 rounded px-4 py-3" >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default NodejsIntegration

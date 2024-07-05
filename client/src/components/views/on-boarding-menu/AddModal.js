import React, { useState, useEffect } from 'react'
import { RxCross2 } from 'react-icons/rx'


const AddModal = ({ closeModal,handleAddService, handleAddLocation, mode }) => {
  const [name, setName] = useState('')

  useEffect(() => {
    document.body.style.overflowY = 'hidden'
    return () => {
      document.body.style.overflowY = 'scroll'
    }
  })
  const saveHndler = async () => {
    
    if (mode === 'service') {
      await handleAddService(name)
    } else if (mode === 'location') {
      await handleAddLocation(name)
    }
    closeModal()
  }
  return (
    <div className="">
      <div className="bg-white container py-2 px-3 d-flex flex-column border rounded">
        <div className="d-flex flex-row justify-content-between border-bottom py-1">
          <h5 className="text-center">{mode === 'service' ? 'Add Service' : 'Add Location'}</h5>
          <span className="border-0 rounded p-1" onClick={closeModal}>
            <RxCross2 size={22} />
          </span>
        </div>
        <div className="d-flex flex-column mt-4">
          <input
            type="text"
            placeholder={mode === 'service' ? 'Add service here' : 'Add location here'}
            className="border rounded px-4 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button className="btn-db mb-2" onClick={saveHndler}>
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddModal

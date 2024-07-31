import React, { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { addNewBlogTopic } from '../../services/BlogTopicApi'

const AddNewBlogTopicModal = ({ closeModal ,updateTopics }) => {
  const [topic, setTopic] = useState('')

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflowY = 'scroll'
    }
  })

  const saveHandler = async () => {
    await addNewBlogTopic(topic)
    updateTopics();
    closeModal()
  }
  return (
    <div className="">
      <div className="bg-white container py-2 px-3 d-flex flex-column border rounded">
        <div className="d-flex flex-row justify-content-between border-bottom py-1">
          <h5 className="text-center">Add Blog Topic</h5>
          <span className="border-0 rounded p-1" onClick={closeModal}>
            <RxCross2 size={22} />
          </span>
        </div>
        <div className="d-flex flex-column mt-4">
          <input
            type="text"
            placeholder="Add new blog topic"
            className="border rounded px-4 py-2"
            value={topic}
            name="topic"
            onChange={(e) => setTopic(e.target.value)}
          />

          <button className="btn-db mb-2" onClick={saveHandler}>
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddNewBlogTopicModal

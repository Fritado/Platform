import React, { useState } from 'react'
import { FaFacebookSquare } from 'react-icons/fa'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { GrStatusGood } from 'react-icons/gr'
import { Link } from 'react-router-dom'

const SocialMediaForm = ({ data, headers, appSettingRoute, icon, heading }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage] = useState(5)
  const totalItems = data.length
  const totalPages = Math.ceil(totalItems / perPage)

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
  }
  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }

  const startIndex = (currentPage - 1) * perPage
  const endIndex = startIndex + perPage
  const itemsToShow = data.slice(startIndex, endIndex)
  return (
    <div className="mx-4">
      <div className="d-sm-flex " style={{ marginLeft: '0px', marginBottom: '10px' }}>
        <div className="d-flex flex-row">
          <span className="pe-2">{icon}</span>
          <h1 className="text-dark fw-normal pe-3">{heading}</h1>
          <Link to={appSettingRoute}>
            <button className="mt-0 border rounded px-2 py-2">
              <span className="pe-2">
                <IoMdAddCircleOutline size={24} />
                Add new app
              </span>
            </button>
          </Link>
        </div>
      </div>
      <div className="conatiner bg-white border my-4">
        <div className="p-4">
          <div>
            <input
              type="Search..."
              placeholder="search"
              className="border border-light-subtle rounded"
            />
          </div>
          <div className="table-responsive">
            <table className="table border rounded table-bordered my-3 text-center">
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {itemsToShow.map((item, index) => (
                  <tr key={index}>
                    <td>{startIndex + index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.appId}</td>
                    <td>{item.appSecret}</td>
                    <td>
                      <div className="border rounded-pill py-1 d-flex justify-content-center">
                        <span className="pe-1 mb-1">
                          <GrStatusGood color="green" />
                        </span>
                        {item.status}
                      </div>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <div className="d-flex justify-content-end">
              <button
                className="px-3 py-2 me-1  border rounded border-light-subtle"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <button
                className="px-3 py-2 me-1  border rounded border-light-subtle"
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SocialMediaForm

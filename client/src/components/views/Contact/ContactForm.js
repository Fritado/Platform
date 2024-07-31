import React, { useState } from 'react'
import { TiEdit } from 'react-icons/ti'
import { PiUserCircleFill } from 'react-icons/pi'
import {MdDelete, MdOutlineFileDownload } from 'react-icons/md'
import { SlCalender } from "react-icons/sl";
import { RxReset } from "react-icons/rx";

const ContactForm = ({ data, headers, icon, heading }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage] = useState(5)
  const totalItems = data.length
  const totalPages = Math.ceil(totalItems / perPage)
  const [paymentDueDate, setPaymentDueDate] = useState()

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
          <h2 className="text-dark fw-normal pe-3">{heading}</h2>
        </div>
      </div>
      <div className="container bg-white border my-4">
        <div className="p-4">
          <div className='d-flex justify-content-between'>
            <div> 
            <input
              type="search"
              placeholder="search"
              className="border border-light-subtle rounded"
            />
          </div>
          <div className='d-flex gap-2'> 
          <div className="icon-container">
            <label
              htmlFor="contact-download"
              className=" button-6 border p-2"
              // onClick={}
              style={{ cursor: 'pointer' }}
            >
              <MdOutlineFileDownload size={24} />
            </label>
            <div class="tooltip my-2">Download all contacts </div>
          </div>
          <div className="icon-container">
            <label
              htmlFor="date-range"
              className=" button-6 border p-2"
              // onClick={}
              style={{ cursor: 'pointer' }}
            >
              <SlCalender size={24} />
            </label>
            <div class="tooltip my-2">Filter by date range</div>
          </div>
          <div className="icon-container">
            <label
              htmlFor="date-range"
              className=" button-6 border p-2"
              // onClick={}
              style={{ cursor: 'pointer' }}
            >
              <RxReset size={24} />
            </label>
            <div class="tooltip my-2">Reset filter</div>
          </div>
          </div>
          </div>
          <div className="table-responsive">
            <table className="table border rounded table-bordered my-3 text-center">
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {itemsToShow.map((item, index) => (
                  <tr key={item._id}>
                    <td>{startIndex + index + 1}</td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{new Date().toLocaleDateString()}</td>
                    <td className="text-center">{<PiUserCircleFill size={38} />}</td>
                    <td>Website</td>
                    <td>{`${item.Name}`}</td>
                    <td>{`${item.email}`}</td>

                    <td>6200892866</td>
                    <td>text</td>
                    <td>
                      <div className="d-flex flex-row gap-3">
                        <span className="border rounded-circle p-2 align-items-center  d-flex justify-content-center">
                          {' '}
                          <TiEdit color="#ffc107" size={20} />
                        </span>

                        <span
                          className="border rounded-circle p-2 d-flex justify-content-center"
                          onClick={() => onDeleteUser(item._id)}
                        >
                          <MdDelete color="red" size={20} />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-end mt-5">
            <button
              className="px-3 py-2 me-1 border rounded border-light-subtle"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <button
              className="px-3 py-2 me-1 border rounded border-light-subtle"
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactForm

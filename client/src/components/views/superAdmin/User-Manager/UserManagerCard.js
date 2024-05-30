import React, { useState } from 'react'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { GrStatusGood } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import { PiUserCircleFill } from 'react-icons/pi'
import { formatDate } from '../../../services/Subscription/UsermanagerService'
import { TiEdit } from 'react-icons/ti'
import { IoKeySharp } from 'react-icons/io5'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { AiFillThunderbolt } from 'react-icons/ai'

const UserManagerCard = ({ data, headers, icon, heading }) => {
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
          <Link to="#">
            <button className="mt-0 border rounded px-2 py-2 align-items-center">
              <span className="pe-2">
                <IoMdAddCircleOutline size={24} />
                Add new
              </span>
            </button>
          </Link>
        </div>
      </div>
      <div className="container bg-white border my-4">
        <div className="p-4">
          <div>
            <input
              type="search"
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
                </tr>
              </thead>
              <tbody>
                {itemsToShow.map((item, index) => (
                  <tr key={item._id}>
                    <td>{startIndex + index + 1}</td>
                    <td>
                      <input type="checkbox"/>
                    </td>
                    <td className="text-center">{<PiUserCircleFill size={38} />}</td>
                    <td>{`${item.firstname} ${item.lastname}`}</td>
                    <td>{item.email}</td>
                    <td>{item.userId}</td>
                    <td>Trial</td>
                    <td>
                      <div className="border rounded-pill px-2 py-1 d-flex justify-content-center">
                        <span className="pe-2 mb-1">
                          <GrStatusGood color={item.accountStatus === 'Active' ? 'green' : 'red'} />
                        </span>
                        {item.accountStatus}
                      </div>
                    </td>
                    <td>{/* Add expiry if available */}</td>
                    <td>
                      <div className="d-flex flex-row gap-3">
                        <span className="border rounded-circle p-2 align-items-center  d-flex justify-content-center">
                          {' '}
                          <TiEdit color="#ffc107" size={20} />
                        </span>
                        <span className="border rounded-circle p-2 d-flex justify-content-center">
                          <IoKeySharp color="" size={20} />
                        </span>
                        <span className="border rounded-circle p-2 d-flex justify-content-center">
                          {' '}
                          <RiDeleteBin6Fill color="red" size={20} />
                        </span>
                        <span className="border rounded-circle p-2 d-flex justify-content-center">
                          {' '}
                          <AiFillThunderbolt color="0D8BF1" size={20} />{' '}
                        </span>
                      </div>
                    </td>
                    <td>{formatDate(item.createdAt)}</td>
                    <td>{/* Add last login if available */}</td>
                    <td>XXXXXXXXX</td>
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

export default UserManagerCard

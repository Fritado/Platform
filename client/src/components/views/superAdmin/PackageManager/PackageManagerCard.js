import React, { useState, useEffect } from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { FaCheckCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { TiEdit } from 'react-icons/ti'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { packageDelete } from '../../../services/Subscription/PackageManagerService'
import PackageEditForm from './PackageEditForm'

const PackageManagerCard = ({ data, headers, appSettingRoute, icon, heading }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [packages, setPackages] = useState(data)
  const [perPage] = useState(5)
  const totalItems = data.length
  const totalPages = Math.ceil(totalItems / perPage)

  const handleOpenModal = (packageData) => {
    setSelectedPackage(packageData)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }
  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
  }
  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }
  const handleDelete = async (packageId) => {
    try {
      await packageDelete(packageId)
      setPackages(
        packages.filter((pkg) => {
          pkg.packageId !== packageId
        }),
      )
    //  console.log('packagedeleted ')
    } catch (error) {
      console.error('Error while deleting package:', error)
    }
  }
  useEffect(() => {
    setPackages(data)
  }, [data])
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
                Add new Package
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
                </tr>
              </thead>
              <tbody>
                {itemsToShow.map((item, index) => (
                  <tr key={index}>
                    <td>{startIndex + index + 1}</td>
                    <td>{item.packageName}</td>
                    <td>{item.packagePrice}</td>
                    <td>{item.validity}</td>
                    <td>
                      <div className="d-flex justify-content-center">
                        <FaCheckCircle color="green" />
                      </div>
                    </td>
                    <td>
                      <div className="d-flex flex-row gap-3 align-items-center justify-content-center">
                        <span
                          className="border rounded-circle p-2 align-items-center d-flex justify-content-center"
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleOpenModal(item)}
                        >
                          <TiEdit size={20} color="#ffc107" />
                        </span>
                        {showModal && (
                          <div
                            className="modal"
                            style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                          >
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <PackageEditForm
                                  onCloseModal={handleCloseModal}
                                  initialPackage={selectedPackage}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        <span
                          className="border rounded-circle p-2 align-items-center d-flex justify-content-center"
                          onClick={() => handleDelete(item.packageId)}
                          style={{ cursor: 'pointer' }}
                        >
                          <RiDeleteBin6Fill size={20} color="" />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PackageManagerCard

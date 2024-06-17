import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { MdAdd } from 'react-icons/md'
import axios from 'axios'
import { CiEdit } from 'react-icons/ci'
import { MdDeleteForever } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import {
  saveAndUpdateBusinessProfile,
  createAndSaveLocation,
  createAndSaveProductAndService,
  updateSingleProductService,
  deleteProductService,
  getAboutBusinessProfile,
  getProductService,
  getLocation,
} from '../../services/onBoarding/businessProfileApi'

const BusinessProfile = () => {
  const [companyName, setCompanyName] = useState('')
  const [aboutBusiness, setAboutBusiness] = useState('')
  const [industryType, setIndustryType] = useState('')
  const [location, setLocation] = useState('')
  const [productAndServices, setproductAndServices] = useState([])
  const [editableIndex, setEditableIndex] = useState(null)
  const [newServiceValue, setNewServiceValue] = useState('')

  const saveLocalStorage = () => {
    try {
      localStorage.setItem('companyName', companyName)
      localStorage.setItem('aboutBusiness', aboutBusiness)
      localStorage.setItem('industryType', industryType)
    } catch (err) {
      console.error('Error saving to local storage:', err)
    }
  }

  useEffect(() => {
    try {
      setIndustryType(localStorage.getItem('industryType') || '')
      setCompanyName(localStorage.getItem('companyName') || '')
      setAboutBusiness(localStorage.getItem('aboutBusiness') || '')
    } catch (error) {
      console.error('Error loading from local storage:', error)
    }
  }, [])

  const handleInputChange = (setState) => (event) => {
    const value = event.target.value
    setState(value)
    localStorage.setItem(event.target.name, value)
  }

  const savingBusinessProfile = async (event) => {
    event.preventDefault()
    const token = localStorage.getItem('token')
    await saveAndUpdateBusinessProfile(companyName, aboutBusiness, token)
  }

  const savingLocation = async (event) => {
    event.preventDefault()
    const token = localStorage.getItem('token')
    await createAndSaveLocation(location, token)
  }

  const savingProductAndService = async (event) => {
    event.preventDefault()
    const token = localStorage.getItem('token')
    await createAndSaveProductAndService(productAndServices, token)
  }

  const editPDS = async (index, newService) => {
    const token = localStorage.getItem('token')
    await updateSingleProductService(productAndServices[index], newService, token)
    const updatedService = [...productAndServices]
    updatedService[index] = newService
    setproductAndServices(updatedService)
    setEditableIndex(null)
  }

  const handleEdit = async (index) => {
    setEditableIndex(index)
    setNewServiceValue(productAndServices[index])
  }
  const handleKeyPress = (e, index) => {
    if (e.key === 'Enter') {
      editPDS(index, newServiceValue)
      setEditableIndex(null)
    }
  }

  const deletePD = async (serviceToDelete) => {
    const token = localStorage.getItem('token')
    await deleteProductService(serviceToDelete, token)
    const updatedProductAndService = productAndServices.filter(
      (service) => service !== serviceToDelete,
    )
    setproductAndServices(updatedProductAndService)
  }

  useEffect(() => {
    getAboutBusinessProfile(localStorage.getItem('token')).then((data) => {
      if (data) {
        setCompanyName(data.companyName)
        setAboutBusiness(data.aboutBusiness)
        setIndustryType(data.industryType)
      }
    })
    getService()
    fetchLocation()
  }, [])
  const getService = async () => {
    const service = await getProductService()
    setproductAndServices(service)
  }
  const fetchLocation = async () => {
    const locationData = await getLocation()
    console.log(locationData)
    setLocation(locationData)
  }

  return (
    <div>
      <div className="page-header">
        <h2 className="text-dark fw-semibold mb-2"> Business Profile </h2>
      </div>
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title ">Business profile</h4>
              <p className="card-description">
                Fritado leverages your business name and description to craft pertinent content. It
                is essential for the description to be accurate and concise
              </p>
              <form className="forms-sample">
                <Form.Group>
                  <label htmlFor="exampleInputName1"> Business Name</label>
                  <Form.Control
                    type="text"
                    name="companyName"
                    value={companyName}
                    onChange={handleInputChange(setCompanyName)}
                    className="form-control"
                    id="exampleInputName1"
                    placeholder="Business Name"
                  />
                </Form.Group>

                <Form.Group>
                  <label htmlFor="exampleTextarea1">About Business</label>
                  <textarea
                    name="aboutBusiness"
                    value={aboutBusiness}
                    onChange={handleInputChange(setAboutBusiness)}
                    //onChange={(e) => setAboutBusiness(e.target.value)}
                    className="form-control"
                    id="exampleTextarea1"
                    col=""
                    rows="4"
                  ></textarea>
                </Form.Group>
                <button onClick={savingBusinessProfile} type="submit" className="btn-db me-2">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* industry name */}
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Industry & sector</h4>
              <p className="card-description">
                Fritado can autonomously generate content focused on your business's location,
                enhancing the ability to reach more pertinent prospective customers.
              </p>
              <form className="forms-sample">
                <Form.Group>
                  <label htmlFor="exampleInputName1">Industry Type</label>
                  <Form.Control
                    type="text"
                    name="industryType"
                    value={industryType}
                    onChange={handleInputChange(setIndustryType)}
                    className="form-control"
                    id="exampleInputName1"
                    placeholder="Industry"
                  />
                </Form.Group>
                <button type="submit" className="btn-db me-2 px-4">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Location</h4>
              <p className="card-description">
                Fritado can autonomously generate content focused on your business's location,
                enhancing the ability to reach more pertinent prospective customers.
              </p>

              <div className="d-flex mx-auto mt-3 justify-content-center align-items-center">
                <ul style={{ listStyle: 'none' }} className="py-3 d-flex flex-row gap-3">
                  {Array.isArray(location) &&
                    location.map((loc, index) => (
                      <li key={index} className="border d-inline px-2 py-1 position-relative">
                        <span className="location-text">{loc}</span>
                        <span className="position-absolute top-0 end-0 ">
                          <RxCross2
                            size={20}
                            className="delete-location-icon"
                            // onClick={() => deleteLocation(loc)}
                          />
                        </span>
                      </li>
                    ))}
                </ul>
              </div>

              <button className="btn-db me-2">Add</button>
            </div>
          </div>
        </div>

        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Product & Services</h4>
              <p className="card-description">
                Fritado can autonomously generate content focused on your business's location,
                enhancing the ability to reach more pertinent prospective customers.
              </p>

              <div style={{ textAlign: 'right' }} className="mt-2">
                <Link to="/add-keyword">
                  <button onClick={savingProductAndService} className="btn-db me-2">
                    Add{' '}
                    <span>
                      <MdAdd size={26} />
                    </span>
                  </button>
                </Link>
              </div>

              <ul style={{ listStyle: 'none' }} className="py-3">
                {Array.isArray(productAndServices) &&
                  productAndServices.map((service, index) => (
                    <div
                      key={index}
                      className={`d-flex flex-row justify-content-between ${
                        index % 2 === 0 ? 'border-bottom border-top' : ''
                      }`}
                      style={{
                        backgroundColor: index % 2 === 0 ? '#f0f1f6' : '#ffffff',
                      }}
                    >
                      {editableIndex === index ? (
                        <li key={index} className="px-2 py-3">
                          <input
                            type="text"
                            value={newServiceValue}
                            onChange={(e) => setNewServiceValue(e.target.value)}
                            // onKeyPress={(e) => handleKeyPress(e, index)}
                          />
                        </li>
                      ) : (
                        <li key={index} className="px-2 py-3">
                          {service.trim()}
                        </li>
                      )}

                      <div className="d-flex align-items-center px-3">
                        <span
                          className="pe-3"
                          // onClick={() => handleEdit(index)}
                        >
                          <CiEdit size={22} />
                        </span>
                        <span className="ps-3">
                          <MdDeleteForever
                            size={22}
                            //onClick={() => deletePD(service)}
                          />
                        </span>
                      </div>
                    </div>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessProfile

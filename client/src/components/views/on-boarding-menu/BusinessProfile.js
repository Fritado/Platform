import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap'
import { MdAdd } from 'react-icons/md'
import { CiEdit } from 'react-icons/ci'
import { MdDeleteForever } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import {
  saveAndUpdateBusinessProfile,
  updateSingleProductService,
  deleteProductService,
  getAboutBusinessProfile,
  getProductService,
  deleteEachLocation,
  getLocation,
  updateEachLocation,
  addNewLocation,
  addNewService,
} from '../../services/onBoarding/businessProfileApi'
import parse from 'html-react-parser'
import AddModal from './AddModal'

const BusinessProfile = () => {
  const [companyName, setCompanyName] = useState('')
  const [aboutBusiness, setAboutBusiness] = useState('')
  const [industryType, setIndustryType] = useState('')
  const [location, setLocation] = useState('')
  const [editableLocationIndex, setEditableLocationIndex] = useState(null)
  const [newLocationValue, setNewLocationValue] = useState('')
  const [productAndServices, setproductAndServices] = useState([])
  const [editableIndex, setEditableIndex] = useState(null)
  const [newServiceValue, setNewServiceValue] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState('service')

  const closeModal = () => {
    setShowModal(false)
  }
  const handleModalOpen = (mode) => {
    setModalMode(mode)
    setShowModal(true)
  }

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
    // console.log('saving ab')
    await saveAndUpdateBusinessProfile(companyName, aboutBusiness, token)
  }
  
  const editPDS = async (index, newService) => {
    await updateSingleProductService(productAndServices[index], newService)
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
    await deleteProductService(serviceToDelete)
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
    setLocation(locationData)
  }
  const deleteLocation = async (loc) => {
    await deleteEachLocation(loc)
    const updatedLocationsName = location.filter((item) => item !== loc)
    setLocation(updatedLocationsName)
  }
  const handleLocationEdit = (index) => {
    setEditableLocationIndex(index)
    setNewLocationValue(location[index])
  }
  const handleLocationChange = (e) => {
    setNewLocationValue(e.target.value)
  }

  const handleLocationKeyPress = (e, index) => {
    if (e.key === 'Enter') {
      updateLocation(index)
    }
  }

  const handleLocationBlur = (index) => {
    updateLocation(index)
  }
  const updateLocation = async (index) => {
    const oldLocation = location[index]
    const newLocation = newLocationValue
    await updateEachLocation(oldLocation, newLocation)
    const updatedLocations = [...location]
    updatedLocations[index] = newLocation
    setLocation(updatedLocations)
    setEditableLocationIndex(null)
  }

  const handleAddLocation = async (locationName) => {
    try {
      await addNewLocation(locationName)
      setShowModal(false)
      fetchLocation()
    } catch (error) {
      console.error('Error adding location:', error)
    }
  }
  const handleAddService = async (serviceName) => {
    try {
      await addNewService(serviceName)
      setShowModal(false)
      getService() 
    } catch (error) {
      console.error('Error adding service:', error)
    }
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

                  <div
                    contentEditable
                    onChange={(e) => setAboutBusiness(e.target.innerText)}
                    className="form-control"
                    id="exampleTextarea1"
                    style={{
                      minHeight: '120px',
                      padding: '12px',
                      border: '1px solid #ced4da',
                      borderRadius: '4px',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      backgroundColor: 'white',
                      outline: 'none',
                    }}
                  >
                    {aboutBusiness && parse(aboutBusiness)}
                  </div>
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

              <div className="d-flex flex-wrap gap-3 align-items-start">
                {Array.isArray(location) &&
                  location.map((loc, index) => (
                    <div
                      key={index}
                      className="border d-inline-flex align-items-center px-3 py-2 position-relative"
                    >
                      {editableLocationIndex === index ? (
                        <input
                          type="text"
                          value={newLocationValue}
                          onChange={handleLocationChange}
                          onKeyPress={(e) => handleLocationKeyPress(e, index)}
                          onBlur={() => handleLocationBlur(index)}
                          className="form-control"
                          style={{
                            border: 'none',
                            outline: 'none',
                            backgroundColor: 'transparent',
                          }}
                        />
                      ) : (
                        <span
                          className="location-text px-3 py-2"
                          onClick={() => handleLocationEdit(index)}
                          style={{
                            border: 'none',
                            outline: 'none',
                            backgroundColor: 'transparent',
                          }}
                        >
                          {loc}
                        </span>
                      )}
                      <span className="position-absolute top-0 end-0 p-2">
                        <RxCross2 size={20} onClick={() => deleteLocation(loc)} />
                      </span>
                    </div>
                  ))}
              </div>

              <button className="btn-db me-2" onClick={() => handleModalOpen('location')}>
                Add
              </button>
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
                <button onClick={() => handleModalOpen('service')} className="btn-db me-2">
                  Add{' '}
                  <span>
                    <MdAdd size={26} />
                  </span>
                </button>
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
                            onKeyPress={(e) => handleKeyPress(e, index)}
                          />
                        </li>
                      ) : (
                        <li key={index} className="px-2 py-3">
                          {service.trim()}
                        </li>
                      )}

                      <div className="d-flex align-items-center px-3">
                        <span className="pe-3" onClick={() => handleEdit(index)}>
                          <CiEdit size={22} />
                        </span>
                        <span className="ps-3">
                          <MdDeleteForever size={22} onClick={() => deletePD(service)} />
                        </span>
                      </div>
                    </div>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container" style={{ width: '40%' }}>
            <AddModal
              closeModal={closeModal}
              handleAddService={handleAddService}
              handleAddLocation={handleAddLocation}
              mode={modalMode}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default BusinessProfile

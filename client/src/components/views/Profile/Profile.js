import React, { useState, useEffect } from 'react'
import { MdOutlineMarkEmailRead } from 'react-icons/md'
import { FaUserEdit, FaEdit } from 'react-icons/fa'
import { IoMdPhonePortrait } from 'react-icons/io'
import { getUserDetails, updateContactNumber } from '../../services/Auth/AuthApi'

const Profile = () => {
  const [loading, setLoading] = useState(false)
  const [userDetails, setUserDetails] = useState({})
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    contactNumber: '',
  })
  const { firstname, lastname, contactNumber } = formData

  const handleChange = ({ currentTarget: input }) => {
    setFormData({ ...formData, [input.name]: input.value })
    // console.log('Form Data:', formData)
  }
  const fetchUserDetails = async () => {
    try {
      const response = await getUserDetails()
      // console.log('response', response)
      setUserDetails(response)
      setFormData({
        firstname: response.firstname,
        lastname: response.lastname,
        contactNumber: response.contactNumber,
      })
    } catch (error) {
      console.error('Error fetching user details:', error.message)
    }
  }
  useEffect(() => {
    fetchUserDetails()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      await updateContactNumber(contactNumber)
      setLoading(false)
      await fetchUserDetails()
    } catch (error) {
      console.error('Error updating contact number:', error.message)
      setLoading(false)
    }
  }
  return (
    <div>
      {/**top part */}
      <div className="page-header">
        <h2 className="text-dark fw-semibold mb-2">Profile </h2>
      </div>

      {/**right part */}
      <div className="form-active card">
        <div className="card-body">
          <form className="d-flex mx-5 form-sample justify-content-center" onSubmit={handleSubmit}>
            <div className="d-flex flex-column">
              <div className="d-flex text-dark">
                <span className="mr-1">
                  <FaEdit size={25} />
                </span>
                <h1 className="card-title" style={{ fontSize: '1.5rem' }}>
                  Edit profile
                </h1>
              </div>

              <div className="d-flex flex-row input-box">
                <div className="d-flex flex-column mr-2">
                  <label htmlFor="firstName" className="">
                    <FaUserEdit /> First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Enter First Name"
                    className="ip-style border rounded p-4 "
                    value={firstname}
                    onChange={handleChange}
                  />
                </div>
                <div className="d-flex flex-column ml-2">
                  <label htmlFor="lastName" className="">
                    <FaUserEdit /> Last Name
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Enter Last Name"
                    className="ip-style border rounded p-4"
                    value={lastname}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="d-flex flex-column input-box ">
                <label htmlFor="email" className="">
                  <MdOutlineMarkEmailRead /> Email
                </label>
                <input
                  readOnly
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter email "
                  className="ip-style border rounded p-4"
                  defaultValue={userDetails.email}
                />
              </div>

              <div className="d-flex flex-column input-box ">
                <label htmlFor="contactNumber" className="">
                  <IoMdPhonePortrait /> Mobile No.
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  id="mobileNo"
                  placeholder="123-45-678"
                  className="ip-style border rounded p-4"
                  value={contactNumber}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className=" profile-btn mt-4 btn btn-primary mr-2"
              >
                {loading ? 'Updating...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile

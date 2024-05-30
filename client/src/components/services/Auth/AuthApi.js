import axios from 'axios'
import { AUTH_API_ROUTES } from '../APIURL/Apis'

export const getUserDetails = async () => {
  try {
    const getUrl = `${AUTH_API_ROUTES.FETCH_PROFILE}`
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not found')
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const userResponse = await axios.get(getUrl, config)
    const details = userResponse.data.user
    //  console.log('userResponse', details)
    return details
  } catch (error) {
    console.error('Error:', error.message)
    throw error
  }
}

export const updateContactNumber = async (contactNumber) => {
  try {
    const saveContactNumber = `${AUTH_API_ROUTES.SAVE_PROFILE}`
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not found')
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.post(saveContactNumber, { contactNumber }, config)
    //console.log('contactNumber saving' , response.data)
    return response
  } catch (error) {
    console.error('Error:', error.message)
    throw error
  }
}

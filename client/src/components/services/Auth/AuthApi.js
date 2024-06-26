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
    //console.log('userResponse', details)
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

export const updateProgress = async (lastVisited, stepsCompleted) => {
  const token = localStorage.getItem('token')
  if (!token) {
    console.error('Token not found')
    return
  }

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await axios.post(
      '/api/auth/update-progress',
      { lastVisited, stepsCompleted },
      config,
    )
    console.log('Progress updated:', response.data)
    return response.data // Optionally return data if needed
  } catch (error) {
    console.error('Error updating progress:', error)
    throw error // Propagate the error to handle in the calling function
  }
}

export const updateUserPlan = async (packageName) => {
  const url = `${AUTH_API_ROUTES.UPDATE_USER_PLAN}`
  const token = localStorage.getItem('token')
  if (!token) {
    console.error('Token not found')
    return
  }
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const updatedPlan = axios.put(url, packageName, config)
    console.log(updatedPlan, ' updatedPlan')
  } catch (error) {
    console.log('error while updating user plan')

    throw error
  }
}

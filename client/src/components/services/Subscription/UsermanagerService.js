import axios from 'axios'
import { USER_MANAGER } from '../APIURL/Apis'

//date format function
export const formatDate = (dateString) => {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleString('default', { month: 'short' })
  const year = date.getFullYear().toString().slice(-2)

  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')

  return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`
}


export const fetchUserInfo = async () => {
  const fetchUrl = `${USER_MANAGER.FETCH_USER_INFO}`
  try {
    const userResponse = await axios.get(fetchUrl)
    const userData = userResponse.data
    // console.log('userResponse', userData);
    return userData
  } catch (error) {
    console.log('Error while fetching user details', error)
  }
}

//delete user
export const deleteUser = async (userId) => {
  const deleteUserUrl= `${USER_MANAGER.DELETE_USER_DATA}`
  try {
    const response = await axios.delete(deleteUserUrl,{ data: { userId } })
    return response.data
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}

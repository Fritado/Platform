import axios from 'axios';
import {BUSINESS_PROFILE_ROUTES} from "../APIURL/Apis"

export const getKeyWords = async (e) => {
  const getKeywordsUrl = `${BUSINESS_PROFILE_ROUTES.GET_KEYWORD}`
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not found')
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await axios.get(getKeywordsUrl, config)
    const data = response.data.data.keywords;
   // console.log('response keyword', data)
    return data;
  } catch (Error) {
    console.error('Error while fetching KeyWords data', Error)
  }
}

export const deleteKeyWord = async (keywordToDelete) => {
  const deleteKeywordUrl = 'http://localhost:4000/api/businessProfile/delete-keyword'
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not found')
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const deleteResponse = await axios.delete(deleteKeywordUrl, {
      data: { keywordToDelete },
      headers: config.headers,
    })
    //console.log("deleteResponse", deleteResponse);
    if (deleteResponse.data.success) {
      return true
    } else {
      console.error('Failed to delete keyword:', deleteResponse.data.message)
      return false
    }
  } catch (error) {
    console.error('Error deleting keyword:', error)
  }
}

export const updateSingleKeyword = async (oldKeyword, newKeyword) => {
  const updateUrl = 'http://localhost:4000/api/businessProfile/update-single-keyword'
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not found')
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await axios.put(updateUrl, { oldKeyword, newKeyword }, config)
    if (response.data.success) {
      return true
    } else {
      console.error('Failed to update keyword:', response.data.message)
      return false
    }
  } catch (error) {
    console.log('Error updating keyword:', error)
    throw error
  }
}

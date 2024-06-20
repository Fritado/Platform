import axios from 'axios'
import { CONNECT_WEBSITE } from '../APIURL/Apis'

export const saveWebsiteType = async (websiteData) => {
  const saveUrl = `${CONNECT_WEBSITE.SAVE_WEBSITE_TYPE}`
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
    const websiteTypeData = await axios.post(saveUrl, websiteData, config);
    return websiteTypeData.data;
  } catch (error) {
    console.log('Error while Saving website type in database', error)
    throw error
  }
}

export const fetchWebsiteDetails = async () => {
  const getUrl = `${CONNECT_WEBSITE.GET_WEBSITE_INFO}`
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
    const websiteDetails = await axios.get(getUrl, config)
    console.log(websiteDetails.data.data, ' websiteDetails')
    return websiteDetails.data.data;
  } catch (error) {
    console.log('Error while getting  website Details from  database', error)
    throw error
  }
}

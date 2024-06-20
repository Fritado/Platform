import axios from 'axios'
import { DOMAIN_API_ROUTES } from '../APIURL/Apis'

export const checkIfProjectUrlExists = async (modifiedUrlInput, token) => {
  try {
    const checkUrl = DOMAIN_API_ROUTES.CHECK_PJ_NAME
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const requestBody = { projectUrl: modifiedUrlInput }
    const checkUrlResponse = await axios.post(checkUrl, requestBody, config)
    return checkUrlResponse.data.exists
  } catch (error) {
    console.log('Error while checking projectUrl existence:', error)
    return false
  }
}

export const savingDomainUrl = async (modifiedUrlInput, token) => {
  try {
    const domainUrl = DOMAIN_API_ROUTES.SAVE_PJ_NAME
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const requestBody = { projectUrl: modifiedUrlInput }
    const domainUrlResponse = await axios.post(domainUrl, requestBody, config)
    return domainUrlResponse
  } catch (error) {
    console.log('Error while saving domainUrl in database', error)
  }
}

export const fetchPageSpeedData = async (modifiedUrlInput, apiKey) => {
  const apiUrl = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'
  const dynamicEndpoint = `${apiUrl}?url=${encodeURIComponent(modifiedUrlInput)}&key=${apiKey}`
  try {
    const response = await fetch(dynamicEndpoint)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching PageSpeed data:', error)
    throw error
  }
}

// currently portal is going to handle one project and this function ( getDomianName) will modify in future.
export const getDomianName = async (token) => {
  const getDomainNameUrl = `${DOMAIN_API_ROUTES.GET_PJ_NAME}`
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    if (!token) {
      throw new Error('Token not found')
    }

    const response = await axios.get(getDomainNameUrl, config)
    const projectDetails = response.data.projectDetails[0];
    const webhookUrl = projectDetails.webhookUrl;
    const fullUrl = response.data.data[0][0]
    const domainName = extractDomainName(fullUrl)
     //console.log('Domain Name:', webhookUrl)
    return { fullUrl, domainName ,webhookUrl}
  } catch (error) {
    console.error('Error while fetching domain name', error)
    return null
  }
}

const extractDomainName = (url) => {
  let domain = url.replace(/^https?:\/\//, '')
  const ProjectName = domain.split('.').slice(-2)
  domain = ProjectName.join('.')
  return domain
}

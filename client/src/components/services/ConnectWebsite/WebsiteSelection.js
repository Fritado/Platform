import axios from 'axios'
import { CONNECT_WEBSITE, DOMAIN_API_ROUTES } from '../APIURL/Apis'

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
    const websiteTypeData = await axios.post(saveUrl, websiteData, config)
    return websiteTypeData.data
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

    return websiteDetails.data.data
  } catch (error) {
    console.log('Error while getting  website Details from  database', error)
    throw error
  }
}

const generateWebhookUrl = (websiteType, technology, domainUrl) => {
  if (websiteType === 'Custom website' && technology === 'PHP') {
    return `${domainUrl}/fritado/webhook.php`
  } else if (websiteType === 'Content management system' && technology === 'Wordpress') {
    return `${domainUrl}/fritado`
  }
  return null
}

export const updateWebhookUrl = async (websiteType, technology, domainName) => {
  const updateWebhookUrl = `${DOMAIN_API_ROUTES.UPDATE_WEBHOOK_URL}`
  try {
    const token = localStorage.getItem('token')
    const domainUrl = domainName // Assuming domainName is the same as domainUrl in this context
    const webhookUrl = generateWebhookUrl(websiteType, technology, domainUrl)

    if (!webhookUrl) {
      throw new Error('Invalid website type or technology selected')
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const updatedwebhookUrl = await axios.post(updateWebhookUrl, { webhookUrl, domainName }, config)

    return webhookUrl
  } catch (error) {
    console.log('Error updating webhook URL.')
    throw error
  }
}

export const updateWebsiteConnectionStatus = async (websiteId, connectionStatus) => {
  const url = `${CONNECT_WEBSITE.WEBSITE_CONNECTION_STATUS}`
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
    const websiteConnectionStatus = await axios.put(url, { websiteId, connectionStatus }, config)

    return websiteConnectionStatus.data
  } catch (error) {
    console.log('Error while Updating website connection status in database', error)
    throw error
  }
}

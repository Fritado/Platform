import axios from 'axios'
import { PORTAL_API_ROUTES } from '../APIURL/Apis'


export const fetchWebsiteName = async () => {
  const getWebsiteUrl = `${PORTAL_API_ROUTES.GET_PJ_NAME}`
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('Token not found , please login first')
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const WebsiteName = await axios.get(getWebsiteUrl, config)
  return WebsiteName.data.data[0][0]
}

export const scrapeWebsite = async (websiteName) => {
  const scrapeUrl = `${PORTAL_API_ROUTES.WEBSITE_SCRAPE}`
  const response = await axios.post(scrapeUrl, { website_name: websiteName })
  return response.data.cleanContent
}

export const analyzeContent = async (cleanContent) => {
  const openAISecretKey = Constants.OPENAI_SECRET_KEY
  const prompt = `
      I have copied this ${cleanContent} content from a service/business website. I want you to analyse this content and provide me below information.
      1. Write about business in 500 words? Store the answer in Business variable.
      2. Give me the list of services and product it offers. Store the answer in Service variable.
      3. Give me 100 short tail and long tail local keywords based on my business location in list view .
      that will help me optimize the website for Search Engine to attract targeted business.
      Store the answer in Keywords variable.
      `
  const data = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.5,
    max_tokens: 2500,
    top_p: 1.0,
    frequency_penalty: 0.52,
    presence_penalty: 0.5,
    stop: ['11.'],
  }
  const url = 'https://api.openai.com/v1/chat/completions'
  const response = await axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${openAISecretKey}`,
    },
  })
  return response.data.choices[0].message.content
}

export const saveBusinessContent = async (businessContent) => {
  const saveBusinessUrl = `${PORTAL_API_ROUTES.SAVE_BUSINESS}`
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('Token not found')
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const requestBody = {
    aboutBusiness: businessContent,
  }
  const response = await axios.put(saveBusinessUrl, requestBody, config)
  return response.data
}

export const saveServiceContent = async (serviceContent) => {
  try {
    const saveServiceUrl = `${PORTAL_API_ROUTES.SAVE_PRODUCT_SERVICE}`
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not found')
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const requestBody = {
      productAndServices: serviceContent,
    }
    const response = await axios.post(saveServiceUrl, requestBody, config)
    return response.data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export const saveKeywordContent = async (keywordContent) => {
  try {
    const saveKeywordUrl = `${PORTAL_API_ROUTES.SAVE_KEYWORD}`
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not found')
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const requestBody = {
      keywords: keywordContent,
    }
    const response = await axios.post(saveKeywordUrl, requestBody, config)
    return response.data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export const saveLocationContent = async (locationContent) => {
  try {
    const saveLocationUrl = `${PORTAL_API_ROUTES.SAVE_LOCATION}`
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not found')
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const requestBody = {
      location: locationContent,
    }
    const response = await axios.put(saveLocationUrl, requestBody, config)
    return response.data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

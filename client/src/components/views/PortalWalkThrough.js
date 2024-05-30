import React, { useState } from 'react'
import Header from '../views/common/Header'
import AuthFooter from '../views/common/AuthFooter'
import axios from 'axios'
import Spinner from '../views/common/Spinner'
import { Link, useNavigate } from 'react-router-dom'
import { PORTAL_API_ROUTES } from '../services/APIURL/Apis'
import {
  fetchWebsiteName,
  scrapeWebsite,
  analyzeContent,
  saveBusinessContent,
  saveServiceContent,
  saveKeywordContent,
  saveLocationContent,
} from '../services/portal/portalWT'

import {fetchPromptDetails} from "../services/PromptService/PromptService";
const PortalWalkThrough = () => {
  const [websiteName, setWebsiteName] = useState('')
  const [cleanContent, setCleanContent] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const fetchwebsiteName = async (e) => {
    setLoading(true)
    const getWebsiteUrl = `${PORTAL_API_ROUTES.GET_PJ_NAME}`
    // const getWebsiteUrl = "api/domainName/fetch-projectUrl";
    const token = localStorage.getItem('token')
    try {
      if (!token) {
        throw new Error('Token not found , please login first')
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const Website_Name = await axios.get(getWebsiteUrl, config)
      const data = Website_Name.data
      const website_array = data.data[0]
      console.log('About Business Response', website_array[0])
      const zerothIndexValue = website_array[0]
      setWebsiteName(zerothIndexValue)
      handleSubmit()
      //console.log("Value at 0th index:", zerothIndexValue);
    } catch (error) {
      console.log(error, 'Error in portal walk Through while fetching website name of business')
      setLoading(false)
    }
  }
  const handleSubmit = async (e) => {
    try {
      const scrapeUrl = `${PORTAL_API_ROUTES.WEBSITE_SCRAPE}`

      const response = await axios.post(
        scrapeUrl,

        { website_name: websiteName },
      )
      const { cleanContent } = response.data
      console.log('cleanContent ', cleanContent)
      setCleanContent(cleanContent)
      analyzeContent()
    } catch (error) {
      console.error('Error in fetching content of scrapped website:', error)
      setError('Failed to analyze content')
      setLoading(false)
    }
  }
  const analyzeContent = async (e) => {
    const promptDetailsResponse = await fetchPromptDetails();
    const promptDetails = promptDetailsResponse[0];
   // console.log("promptDetails" , promptDetails);
    const openAISecretKey = process.env.OPENAI_SECRET_KEY
    const prompt = `
      I have copied this  ${cleanContent}  content from a service/business website. I want you to analyse this content and provide me below information.
      1.${promptDetails.BusinessDetails}
      2. ${promptDetails.Keyword}
      3.${promptDetails.ProductAndService}
      4.${promptDetails.Location}
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
    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openAISecretKey}`,
        },
      })
      console.log('response', response)
      const messageContent = response.data.choices[0].message.content
      console.log('message content', messageContent)
      const businessStartIndex = messageContent.indexOf('Business:') + 10
      const businessEndIndex = messageContent.indexOf('Service:')
      const businessContent = messageContent.substring(businessStartIndex, businessEndIndex).trim()
      await savingbusinessContent(businessContent)

      const servicesStartIndex = messageContent.indexOf('Services:') + 9
      const servicesEndIndex = messageContent.indexOf('Keywords:')
      const servicesContent = messageContent.substring(servicesStartIndex, servicesEndIndex).trim()
      await savingServiceContent(servicesContent)

      const keywordsStartIndex = messageContent.indexOf('Keywords:') + 9
      const keywordsContent = messageContent.substring(keywordsStartIndex).trim()
      await savingKeyWordContent(keywordsContent)

      setLoading(false)
      navigate('/dashboard')
    } catch (Error) {
      console.log(Error, 'Error while calling openAI api ')
      setLoading(false)
    }
  }

  const savingbusinessContent = async (businessContent) => {
    try {
      const saveBusinessUrl = `${PORTAL_API_ROUTES.SAVE_BUSINESS}`
      console.log('saveBusinessUrl', saveBusinessUrl)
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

      const BusinessContentResponse = await axios.post(saveBusinessUrl, requestBody, config)
      console.log('Business content saved:', BusinessContentResponse.data)
    } catch (error) {
      console.error('Error while saving business content of Open AI:', error)
    }
  }

  const savingServiceContent = async (serviceContent) => {
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

      const ServiceContentResponse = await axios.post(saveServiceUrl, requestBody, config)
      console.log('Service content saved:', ServiceContentResponse.data)
    } catch (Error) {
      console.log('Error received while saving Service data coming from Open AI', Error)
    }
  }

  const savingKeyWordContent = async (keyWordsContent) => {
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
        keywords: keyWordsContent,
      }

      const KeywordsContentResponse = await axios.post(saveKeywordUrl, requestBody, config)
      console.log('Keywords content saved:', KeywordsContentResponse.data)
    } catch (Error) {
      console.log('Error received while saving keyword data coming from Open AI', Error)
    }
  }

  const savingLocation = async (locationContent) => {
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

      const LocationResponse = await axios.put(saveLocationUrl, requestBody, config)
      console.log('Location content saved:', LocationResponse.data)
    } catch (Error) {
      console.log('Error received while saving location data coming from Open AI', Error)
    }
  }

  return (
    <div>
      <Header />
      <div>
        <div
          className="d-flex flex-column mt-4 justify-content-center mx-auto bg-white"
          style={{ maxWidth: '960px' }}
        >
          <div className="d-flex flex-column py-4 px-3">
            <h2 className="">Watch our guide</h2>
            <p>
              Lorem lorem lorem lorem lorem Lorem lorem lorem lorem loremLorem lorem lorem lorem
              loremLorem lorem lorem lorem lorem
            </p>
          </div>
          <div className="my-3 px-3 d-flex justify-content-center ">
            <iframe
              width="850"
              height="360"
              src="https://www.youtube.com/embed/4RVv5o-ctic?si=TbM0KiN59JZJ3ptp&amp;start=24"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        <div className="d-flex justify-content-center mx-auto  mt-4 ">
          <Link to="#">
            <button
              onClick={fetchwebsiteName}
              className="mt-3 btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn "
            >
              Explore Your Dashboard
            </button>
            {loading && (
              <div className="position-absolute top-100 start-50 translate-middle">
                <Spinner />
              </div>
            )}
          </Link>
        </div>
      </div>
      <AuthFooter />
    </div>
  )
}

export default PortalWalkThrough

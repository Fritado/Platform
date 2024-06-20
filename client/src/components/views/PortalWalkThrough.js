import React, { useState } from 'react'
import Header from '../views/common/Header'
import AuthFooter from '../views/common/AuthFooter'
import axios from 'axios'
import Spinner from '../views/common/Spinner'
import { Link, useNavigate } from 'react-router-dom'
import { PORTAL_API_ROUTES, BUSINESS_PROFILE_ROUTES } from '../services/APIURL/Apis'
import { toast } from 'react-hot-toast'
import { fetchPromptDetails } from '../services/PromptService/PromptService'

const PortalWalkThrough = () => {
  const [websiteName, setWebsiteName] = useState('')
  const [industryType, setIndustryType] = useState('')
  const [cleanContent, setCleanContent] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const getIndustryType = async () => {
    const getUrl = `${BUSINESS_PROFILE_ROUTES.GET_ABOUT_BP}`
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
      const response = await axios.get(getUrl, config)
      const industryRes = response.data.data.industryType
      setIndustryType(industryRes)
      // console.log("Response from industry type" , industryRes );
    } catch (Error) {
      console.log(error, 'Error while fetching industry type')
    }
  }

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
      getIndustryType()
      handleSubmit()
      //console.log("Value at 0th index:", zerothIndexValue);
    } catch (error) {
      console.log(error, 'Error in portal walk Through while fetching website name of business')
      setLoading(false)
    }
  }
  const handleSubmit = async (e) => {
    setLoading(true)
    try {
      const scrapeUrl = `${PORTAL_API_ROUTES.WEBSITE_SCRAPE}`

      const response = await axios.post(
        scrapeUrl,

        { website_name: websiteName },
      )
      const { summary } = response.data
      console.log('cleanContent ', summary)
      setCleanContent(summary)
      analyzeContent()
    } catch (error) {
      console.error('Error in fetching content of scrapped website:', error)
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error("We're experiencing some technical difficulties. Please try again later.")
      }
    } finally {
      setLoading(false)
    }
  }
  const analyzeContent = async (e) => {
    const promptDetailsResponse = await fetchPromptDetails()
    const promptDetails = promptDetailsResponse[0]
    // console.log("promptDetails" , promptDetails);
    const openAISecretKey = process.env.OPENAI_SECRET_KEY
    const prompt = `
You have extensive expertise in crafting web content and optimizing it for search engines (SEO). Upon receiving a content dump from a website, your task is to analyze it thoroughly. Here are the specific details related to the company:

1. Business name: ${websiteName}
2. Business industry: ${industryType}
3. Content dump from the website: ${cleanContent}

Based on this information, please provide the following outputs in the specified order:

1. About Business
   - Write a detailed introduction and description of all products and services offered by ${websiteName} in 2000 words in HTML format. Ensure the background color is white.

2. Keywords
   - Provide the maximum number of business keywords based on the products, services, ${cleanContent}, and the location of the business. Save this content without HTML format.

3. Services
   - Provide a list of services offered by ${websiteName}. Save this content without HTML format.

4. Locations
   - Provide a list of business locations for ${websiteName}. Save this content without HTML format.

    `

    // console.log('Prompt', prompt)
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
      //console.log('response', response)

      const messageContent = response.data.choices[0].message.content
      console.log('message content', messageContent)

      const aboutBusinessRegex = /About\s*Business[:\s]*-?\s*([\s\S]*?)(?=\s*Keywords[:\s]*|$)/i
      const keywordsRegex = /Keywords[:\s]*-?\s*([\s\S]*?)(?=\s*Services[:\s]*|$)/i
      const servicesRegex = /Services[:\s]*-?\s*([\s\S]*?)(?=\s*Locations[:\s]*|$)/i
      const locationsRegex = /Locations[:\s]*-?\s*([\s\S]*?)(?=$)/i

      const aboutBusinessMatch = messageContent.match(aboutBusinessRegex)
      const keywordsMatch = messageContent.match(keywordsRegex)
      const servicesMatch = messageContent.match(servicesRegex)
      const locationsMatch = messageContent.match(locationsRegex)

      const aboutBusiness = aboutBusinessMatch ? aboutBusinessMatch[1].trim() : ''
      const keywords = keywordsMatch ? keywordsMatch[1].trim() : ''
      const services = servicesMatch ? servicesMatch[1].trim() : ''
      const locations = locationsMatch ? locationsMatch[1].trim() : ''

     // Saving the extracted content
      await savingBusinessContent(aboutBusiness)
      await savingKeyWordContent(keywords)
      await savingServiceContent(services)
      await savingLocationContent(locations)
      setLoading(false)
     navigate('/dashboard')
    } catch (Error) {
      console.log(Error, 'Error while calling openAI api ')
      toast.error("We're experiencing some technical difficulties. Please try again later.")
      setLoading(false)
    }
  }

  const savingBusinessContent = async (businessContent) => {
    try {
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

      const BusinessContentResponse = await axios.post(saveBusinessUrl, requestBody, config)
      console.log('Business content saved:', BusinessContentResponse.data)
    } catch (error) {
      console.error('Error while saving business content of Open AI:', error)
    }
  }

  const savingServiceContent = async (servicesContent) => {
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

      const cleanedServices = servicesContent
        .split('\n')
        .map((service) => service.replace(/^\d+\.\s*/, '').trim())
        .filter((service) => service !== '' && service !== '###')

      const ServiceContentResponse = await axios.post(
        saveServiceUrl,
        { productAndServices: cleanedServices },
        config,
      )
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
      const cleanedKeywords = keyWordsContent
        .split('\n')
        .map((keyword) => keyword.replace(/^\d+\.\s*/, '').trim())
        .filter((keyword) => keyword !== '' && keyword !== '###')

      const KeywordsContentResponse = await axios.post(
        saveKeywordUrl,
        { keywords: cleanedKeywords },
        config,
      )
      console.log('Keywords content saved:', KeywordsContentResponse.data)
    } catch (Error) {
      console.log('Error received while saving keyword data coming from Open AI', Error)
    }
  }

  const savingLocationContent = async (locationsContent) => {
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
      const cleanedLocations = locationsContent
        .split('\n')
        .map((location) => location.replace(/^\d+\.\s*/, '').trim())
        .filter((location) => location !== '' && location !== '###')

      const LocationResponse = await axios.post(
        saveLocationUrl,
        { location: cleanedLocations },
        config,
      )
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

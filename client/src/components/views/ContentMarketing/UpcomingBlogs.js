import React, { useState, useEffect } from 'react'
import BlogAutomation from './BlogAutomation'
import { MdEdit, MdDelete } from 'react-icons/md'
import { FaEye } from 'react-icons/fa'
import { GoDotFill } from 'react-icons/go'
import { Link, useNavigate } from 'react-router-dom'

import {
  fetchingAboutBusiness,
  fetchOpenAITopics,
  saveBlogTopic,
  gettingBlogTopics,
  BlogGenerate,
  saveAllBlogs,
  checkBlogAvailability,
  fetchBlogsByTopic,
  getBlogStatusByTopic,
} from '../../services/BlogTopicApi'
import { getKeyWords } from '../../services/onBoarding/KeywordApi'
import { getProductService, getLocation } from '../../services/onBoarding/businessProfileApi'

const UpcomingBlogs = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState()
  const [topics, setTopics] = useState([])
  const [generatedBlogs, setGeneratedBlogs] = useState([])
  //const [blogStatuses, setBlogStatuses] = useState({});
  const [statusMap, setStatusMap] = useState({})
  const [businessData, setBusinessData] = useState({
    aboutBusiness: '',
    industryType: '',
    keywords: '',
    productsAndServices: '',
    location: '',
  })

  const getAboutBusiness = async (e) => {
    try {
      const { aboutBusiness, industryType } = await fetchingAboutBusiness()
      const keywords = await getKeyWords()
      const productsAndServices = await getProductService()
      const location = await getLocation()

      setBusinessData({
        aboutBusiness,
        industryType,
        keywords,
        productsAndServices,
        location,
      })
      await getOpenAITopics(aboutBusiness, keywords, industryType, productsAndServices, location)
    } catch (error) {
      console.log('Error while fetching business data', error)
    }
  }
  //generate blog topic auto

  const getOpenAITopics = async (
    aboutBusiness,
    keywords,
    industryType,
    productsAndServices,
    location,
  ) => {
    //   if (topics.length === 0) {
    try {
   //   console.log('calling')
      const generatedTopics = await fetchOpenAITopics(
        aboutBusiness,
        keywords,
        industryType,
        productsAndServices,
        location,
      )

      const cleanedTopics = generatedTopics
        .map((topic) => {
          // Remove inverted commas and numbers
          return topic
            .replace(/^[\d."]+/g, '')
            .replace(/"/g, '')
            .trim()
        })
        .filter((topic) => topic.trim() !== '')
        setTopics(cleanedTopics)
        console.log('cleanedTopics', cleanedTopics)
      await saveBlogTopic(cleanedTopics)
    } catch (error) {
      console.log('Error while fetching topics:', error)
    }
    // }
  }

  const fetchBlogTopics = async () => {
    try {
      // console.log('calling get')
      const blogTpcResponse = await gettingBlogTopics()
      if (blogTpcResponse.length === 0) {
        // Check if topics are not already present
        await getOpenAITopics(industryInfo)
      } else {
        setTopics(blogTpcResponse)
      }
      //console.log('blogTpcResponse ', blogTpcResponse)
    } catch (error) {
      console.log(error, 'Error while fetching blog topics')
    }
  }
  const fetchBlogStatusForTopics = async () => {
    try {
      //console.log('Fetching blog status for topics:', topics)

      if (topics.length === 0) {
        console.error('No topics available to fetch statuses for.')
        return
      }

      const StatusPromise = topics.map(async (topic) => {
        try {
          const response = await getBlogStatusByTopic(topic)
         //  console.log(`Fetched status for topic: ${topic}`, response.data)
          const { status, publishDate, approvedDate } = response.data
          return { topic, status, publishDate, approvedDate }
        } catch (error) {
          //console.error(`Error fetching status for topic: ${topic}`, error)
          return { topic, status: 'error', publishDate: 'N/A', approvedDate: 'N/A' }
        }
      })

      const blogStatusList = await Promise.all(StatusPromise)
      const newStatusMap = {}
      blogStatusList.forEach(({ topic, status, publishDate, approvedDate }) => {
        newStatusMap[topic] = { status, publishDate, approvedDate }
      })

      // console.log('Updated statusMap:', newStatusMap)
      setStatusMap(newStatusMap)
    } catch (error) {
      console.error('Error while fetching blog statuses:', error)
    }
  }

  useEffect(() => {
    fetchBlogStatusForTopics()
  }, [topics])

  const handleRefreshButtonClick = () => {
    getAboutBusiness()
  }

  useEffect(() => {
    fetchBlogTopics()
  }, [])

  const BlogsResponse = async () => {
    try {
      const missingTopics = await checkBlogAvailability()
      console.log('Missing topics from upcoming blog page:', missingTopics)
      const generatedBlogs = []

      for (const topic of topics) {
        // Check if the current topic is missing in the database
        const trimmedTopic = topic.trim()
        const isMissing = missingTopics.some(
          (missingTopic) => missingTopic.trim().toLowerCase() === trimmedTopic.toLowerCase(),
        )

        if (isMissing) {
          console.log(`Generating blog for topic: ${topic}`)
          // If the topic is missing, generate the blog
          const blog = await BlogGenerate(topic)
          console.log('blog', blog)
          generatedBlogs.push({ topic, blog })
          await saveAllBlogs(trimmedTopic, blog)
          console.log(`Blog generated for topic: ${topic}`)
        } else {
          console.log(`Skipping topic ${topic} as blog already exists`)
        }
      }

      // After generating all blogs, update the state variable
      setGeneratedBlogs(generatedBlogs)
    } catch (error) {
      console.error('Error while generating blogs:', error)
    }
  }
  const handleEyeButtonClick = async (topic) => {
    try {
      const response = await fetchBlogsByTopic(topic)
      if (response.success) {
        navigate(`/blog-details/${encodeURIComponent(topic)}`)
      } else {
        console.error('Failed to fetch blog details:', response.message)
      }
    } catch (error) {
      console.error('Error fetching blog details:', error)
    }
  }

  const truncateTopic = (topic, maxChars) => {
    if (topic.length <= maxChars) {
      return topic
    }
    return topic.slice(0, maxChars) + '......'
  }

  return (
    <div className="">
      <BlogAutomation />
      <div className="ms-4 my-3">
        <button onClick={handleRefreshButtonClick} className="me-3 border-0 rounded px-3 py-2">
          Refresh
        </button>
        <button onClick={BlogsResponse} className="ms-3 border-0 rounded p-2 ">
          Generate Blogs
        </button>
      </div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Upcoming Blog Posts</h4>

            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th> Priority </th>
                    <th>Blog Topic</th>
                    <th>To be published</th>
                    <th>Approved On</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {/* display blog topic in 70 words else show.... */}
                <tbody className="text-capitalize">
                  {topics.map((topic, index) => {
                    const statusDetails = statusMap[topic]
                    // console.log(`Rendering topic: ${topic}`)
                    // console.log('Status details:', statusDetails)

                    const statusColor =
                      statusDetails && statusDetails.status === 'approved' ? 'green' : 'red'
                    const publishDate = statusDetails?.publishDate || '______'
                    const approvedDate = statusDetails?.approvedDate || '_______'
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{truncateTopic(topic, 70)}</td>

                        <td>{publishDate}</td>
                        <td>{approvedDate}</td>
                        <td>{<GoDotFill size={30} color={statusColor} />}</td>
                        <td>
                          <div className="d-flex flex-row">
                            <span
                              className="pe-4"
                              onClick={() => handleEyeButtonClick(topic)}
                              style={{ cursor: 'pointer' }}
                            >
                              <FaEye size={22} />
                            </span>

                            <span className="pl-">
                              <MdDelete size={22} />
                            </span>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpcomingBlogs

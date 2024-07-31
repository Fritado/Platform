import React, { useState, useEffect } from 'react'
import BlogAutomation from './BlogAutomation'
import { MdDelete, MdOutlineFileUpload, MdOutlineFileDownload, MdSchedule } from 'react-icons/md'
import { FaEye } from 'react-icons/fa'
import { GoDotFill } from 'react-icons/go'
import { Link, useNavigate } from 'react-router-dom'
import { IoAdd } from 'react-icons/io5'
import { IoMdRefresh } from 'react-icons/io'
import { GrDeploy } from 'react-icons/gr'
import { LiaBlogSolid } from 'react-icons/lia'
import {
  fetchingAboutBusiness,
  fetchOpenAITopics,
  saveBlogTopic,
  gettingBlogTopics,
  saveAllBlogs,
  checkBlogAvailability,
  fetchBlogsByTopic,
  getBlogStatusByTopic,
  BlogGenerate,
  uploadBlogTopics,
  downloadBlogTopicsExcel,
  publishBlogtoWordpress,
} from '../../services/BlogTopicApi'
import { getKeyWords } from '../../services/onBoarding/KeywordApi'
import { getProductService, getLocation } from '../../services/onBoarding/businessProfileApi'
import AddNewBlogTopicModal from './AddNewBlogTopicModal'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import { GiProgression } from 'react-icons/gi'
import { TiTick } from 'react-icons/ti'

const UpcomingBlogs = () => {
  const navigate = useNavigate()
  const [blogid, setBlogid] = useState('')
  const [topics, setTopics] = useState([])
  const [generatedBlogs, setGeneratedBlogs] = useState([])
  const [statusMap, setStatusMap] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [file, setFile] = useState(null)
  const [editableDate, setEditableDate] = useState()
  const [selectedBlogId, setSelectedBlogId] = useState(null)
  //upload excel file
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      try {
        await uploadBlogTopics(selectedFile)
        updateTopics()
      } catch (error) {
        console.error('Upload error:', error)
      }
    }
  }

  const handleDownloadExcel = async () => {
    try {
      const excelBlob = await downloadBlogTopicsExcel()
      const url = window.URL.createObjectURL(new Blob([excelBlob]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'blog_topics.xlsx')
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
    } catch (error) {
      console.error('Failed to download Excel file:', error)
    }
  }

  const [businessData, setBusinessData] = useState({
    aboutBusiness: '',
    industryType: '',
    keywords: '',
    productsAndServices: '',
    location: '',
  })
  const closeModal = () => {
    setShowModal(false)
  }
  const handleModalOpen = () => {
    setShowModal(true)
  }
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
          // console.log(`Fetched status for topic: ${topic}`, response.data.blogId)
          setBlogid(response.data.blogId)
          const { blogId, status, publishDate, approvedDate } = response.data
          return { blogId, topic, status, publishDate, approvedDate }
        } catch (error) {
          //console.error(`Error fetching status for topic: ${topic}`, error)
          return { topic, status: 'error', publishDate: 'N/A', approvedDate: 'N/A' }
        }
      })

      const blogStatusList = await Promise.all(StatusPromise)
      const newStatusMap = {}
      blogStatusList.forEach(({ blogId, topic, status, publishDate, approvedDate }) => {
        newStatusMap[topic] = { blogId, status, publishDate, approvedDate }
      })

      //console.log('Updated statusMap:', newStatusMap)
      setStatusMap(newStatusMap)
    } catch (error) {
      console.error('Error while fetching blog statuses:', error)
    }
  }
  const updateTopics = async () => {
    await fetchBlogTopics()
    fetchBlogStatusForTopics()
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
          const blogContent = await BlogGenerate(topic)
          // console.log('blog', { blogContent, imageUrl });
          generatedBlogs.push({ topic, blogContent })
          await saveAllBlogs(trimmedTopic, blogContent)
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
    return topic.slice(0, maxChars) + '...'
  }

  const updatePublishDate = async (topic, date) => {
    try {
      const blogId = blogid
      if (blogId) {
        const response = await axios.put('http://localhost:4000/api/openAi/update-publish-date', {
          blogId,
          publishDate: date,
        })

        if (response.status === 200) {
          const updatedStatusMap = { ...statusMap }
          updatedStatusMap[topic].publishDate = date
          setStatusMap(updatedStatusMap)
        } else {
          console.error('Failed to update publish date')
        }
      }
    } catch (error) {
      console.error('Error updating publish date:', error)
    }
  }

  const handleDateChange = (date, topic) => {
    if (date && topic) {
      setEditableDate(date)
      updatePublishDate(topic, date)
    }
  }
  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date.getTime())
  }

  const handlePublish = async (blogId) => {
    if (!blogId) {
      console.error('Blog ID is not defined')
      return
    }
    try {
      const response = await publishBlogtoWordpress(blogId)
      if (response.success) {
        console.log('Blog posted successfully')
      } else {
        console.error('Error posting blog:', response.message)
      }
    } catch (error) {
      console.error('Error publishing blog:', error)
    }
  }

  const handlePublishButtonClick = (blogId) => {
    handlePublish(blogId)
  }

  return (
    <div className="">
      <BlogAutomation />
      <div className="d-flex justify-content-between">
        <div></div>
        <label className="text-right">
          <i style={{ marginRight: '2rem', cursor: 'pointer' }}>Download sample CSV file </i>
        </label>
      </div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="d-flex flex-row justify-content-between">
              <h4 className="card-title">Upcoming Blog Posts</h4>
              <div className="d-flex gap-2">
                <div className="icon-container">
                  <label
                    htmlFor="refresh-topic"
                    className=" button-6 border p-2"
                    onClick={handleRefreshButtonClick}
                    style={{ cursor: 'pointer' }}
                  >
                    <IoMdRefresh size={24} />
                  </label>
                  <div class="tooltip my-2">Refresh blog topic </div>
                </div>

                <div className="icon-container">
                  <label
                    htmlFor="generate-blog"
                    className="  button-6  border p-2"
                    onClick={BlogsResponse}
                    style={{ cursor: 'pointer' }}
                  >
                    <LiaBlogSolid size={24} />
                  </label>
                  <div class="tooltip my-2">Generate blog</div>
                </div>

                <div className="icon-container">
                  <label
                    htmlFor="add-topic"
                    className=" button-6  border p-2"
                    onClick={() => handleModalOpen()}
                    style={{ cursor: 'pointer' }}
                  >
                    <IoAdd size={24} />
                  </label>
                  <div class="tooltip my-2">Add new blog topic </div>
                </div>
                <div className="icon-container">
                  <label
                    htmlFor="file-upload"
                    className=" button-6  border p-2"
                    style={{ cursor: 'pointer' }}
                  >
                    <MdOutlineFileUpload size={24} />
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <div className="tooltip my-2">Upload blog topics</div>
                </div>
                <div className="icon-container">
                  <label
                    htmlFor="button-6 file-download"
                    className=" button-6  border p-2"
                    onClick={handleDownloadExcel}
                    style={{ cursor: 'pointer' }}
                  >
                    <MdOutlineFileDownload size={24} />
                  </label>
                  <div class="tooltip my-2">Download blog topics </div>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-striped">
                <thead className="">
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
                    //   console.log('Status details:', statusDetails)

                    const statusColor =
                      statusDetails && statusDetails.status === 'approved' ? 'green' : 'red'
                    const publishDate = statusDetails?.publishDate || '______'
                    const approvedDate = statusDetails?.approvedDate || '_______'
                    const blogId = statusDetails?.blogId
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{truncateTopic(topic, 50)}</td>

                        <td>
                          <DatePicker
                            selected={
                              isValidDate(new Date(publishDate)) ? new Date(publishDate) : null
                            }
                            onChange={(date) => handleDateChange(date, topic)}
                            dateFormat="yyyy-MM-dd"
                            showTimeSelect
                            timeFormat="HH:mm"
                            placeholderText="Select Date"
                            className="d-block w-100 border-0 bg-transparent"
                          />
                        </td>

                        <td>{approvedDate}</td>
                        <td>
                          <div className="d-flex flex-row">
                            <div className="icon-container pe-2">
                              <label
                                htmlFor="button-6 blog-status"
                                className=" button-6 border p-1"
                                style={{ cursor: 'pointer' }}
                              >
                                <GoDotFill size={22} color={statusColor} />
                              </label>
                              <div class="tooltip my-2">
                                {statusColor === 'red'
                                  ? 'Awaiting blog approval'
                                  : `Autopost approved`}
                              </div>
                            </div>

                            <div className="icon-container">
                              <label
                                htmlFor="button-6 blog-status"
                                className=" button-6 border p-1"
                                style={{ cursor: 'pointer' }}
                              >
                                <MdSchedule size={22} />
                              </label>
                              <div class="tooltip my-2">
                                {statusColor === 'red'
                                  ? 'Awaiting blog approval'
                                  : `Autopost approved`}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="d-flex flex-row">
                            <div className="icon-container pe-2">
                              <label
                                htmlFor="button-6 view-blog"
                                className=" button-6  border p-1"
                                onClick={() => handleEyeButtonClick(topic)}
                                style={{ cursor: 'pointer' }}
                              >
                                <FaEye size={18} />
                              </label>
                              <div class="tooltip my-2">View blog</div>
                            </div>

                            <div className="icon-container pe-2">
                              <label
                                htmlFor="button-6 force-posting"
                                className=" button-6  border p-1"
                                onClick={() => handlePublishButtonClick(blogId)}
                                style={{ cursor: 'pointer' }}
                              >
                                <GrDeploy size={18} />
                              </label>
                              <div class="tooltip my-2">Force posting</div>
                            </div>

                            <div className="icon-container pe-2 ">
                              <label
                                htmlFor="button-6 delete-blog"
                                className=" button-6  border p-1"
                                style={{ cursor: 'pointer' }}
                              >
                                <MdDelete size={18} />
                              </label>
                              <div class="tooltip my-2">Delete blog</div>
                            </div>

                            <div className="icon-container">
                              <label
                                htmlFor="button-6 force-posting"
                                className=" button-6  border p-1"
                                style={{ cursor: 'pointer' }}
                              >
                                <GiProgression size={18} />
                              </label>
                              <div class="tooltip my-2">view report</div>
                            </div>
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
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container" style={{ width: '40%' }}>
            <AddNewBlogTopicModal closeModal={closeModal} updateTopics={updateTopics} />
          </div>
        </div>
      )}
    </div>
  )
}

export default UpcomingBlogs

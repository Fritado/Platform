import React, { useState, useEffect } from 'react'
import Header from '../../common/Header'
import { Link } from 'react-router-dom'
import AuthFooter from '../../common/AuthFooter'
import DefaultBlogImage from '../../../../assets/images/default-blog-image.png.jpg'
import { GiFastBackwardButton } from 'react-icons/gi'
import {
  fetchBlogsByTopic,
  updateBlogDescription,
  approveBlog,
  getBlogStatusByTopic,
  handleBlogImage,
  generateImage
} from '../../../services/BlogTopicApi'
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser'
import { FiDownload } from 'react-icons/fi'

const decodeTopic = (encodedTopic) => {
  return decodeURIComponent(encodedTopic.replace(/\+/g, ' '))
}
const BlogDetails = () => {
  const { topic } = useParams()
  const decodedTopic = decodeTopic(topic)
  //console.log("topic", decodedTopic);
  const [blogDescription, setBlogDescription] = useState('')
  const [firstParagraph, setFirstParagraph] = useState('')
  const [secondParagraph, setSecondParagraph] = useState('')
  const [status, setStatus] = useState('pending')
  const [editedDescription, setEditedDescription] = useState('')
  const [blogId, setBlogId] = useState('')
  const [imageGenerated, setImageGenerated] = useState(false)
  const [blogDetails, setBlogDetails] = useState(null)

  useEffect(() => {
    fetchBlogDetails(decodedTopic)
    const storedStatus = localStorage.getItem(`blogStatus_${decodedTopic}`)
    if (storedStatus) {
      setStatus(storedStatus)
    } else {
      fetchBlogStatus(decodedTopic)
    }
  }, [decodedTopic])

  useEffect(() => {
    localStorage.setItem(`blogStatus_${decodedTopic}`, status)
  }, [status, decodedTopic])

  const fetchBlogDetails = async (topic) => {
    try {
      const response = await fetchBlogsByTopic(topic)
      console.log('response', response)
      setBlogDetails(response)
      if (response.success) {
        setBlogId(response.blogId)
        setBlogDescription(response.data)
        extractParagraphs(response.data)
        setImageGenerated(!!response.image)
      } else {
        console.error('Failed to fetch blog details:', response.message)
      }
    } catch (error) {
      console.error('Error fetching blog details:', error)
    }
  }

  const handleDownloadImage = async () => {
    try {
      if (blogDetails) {
        const { blogId, data } = blogDetails
        await handleBlogImage(blogId, decodedTopic, data)
        fetchBlogDetails() // Refresh the recent blog data to reflect the updated image
      }
    } catch (error) {
      console.error('Error handling blog image:', error)
    }
  }

  const extractParagraphs = (description) => {
    const words = description.split(' ')
    const first200Words = words.slice(0, 100).join(' ')
    setFirstParagraph(first200Words)

    const remainingWords = words.slice(200).join(' ')
    setSecondParagraph(remainingWords)
  }

  const handleSave = async () => {
    try {
      const ans = await updateBlogDescription(blogId, blogDescription)
      if (ans.success) {
        setBlogDescription(editedDescription)
      } else {
        console.error('Failed to update blog description:', ans.message)
      }
    } catch (error) {
      console.error('Error updating blog description:', error)
    }
  }

  const handleBlur = (e) => {
    const updatedDescription = e.target.innerText
    setEditedDescription(updatedDescription)
    handleSave()
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.target.blur()
    }
  }
  const fetchBlogStatus = async (topic) => {
    try {
      const response = await getBlogStatusByTopic(topic)
      const blogStatus = response.data.status
      setStatus(blogStatus)
    } catch (error) {
      console.error('Error fetching blog status:', error)
    }
  }
  const handleToggle = async () => {
    try {
      if (status === 'pending') {
        setStatus('approved')
        const response = await approveBlog(blogId)
        if (!response.success) {
          console.error('Failed to approve blog:', response.message)
          setStatus('pending')
        }
      }
    } catch (error) {
      console.error('Error toggling blog status:', error)
    }
  }

  const extractImagePath = (path) => {
    if (typeof path === 'string') {
      const basePath = 'F:\\Fritado - WEBSITE\\Portal-platform\\server\\controllers\\BlogImage\\'
      return path.replace(basePath, '').replace(/\\/g, '/')
    }
    return ''
  }

  return (
    <div>
      <Header />
      <div className="px-4 mt-4" style={{ marginRight: '4rem', marginLeft: '4rem' }}>
        <div className="mt-4 d-flex flex-column justify-content-center">
          <div className="d-flex flex-row justify-content-between align-items-center">
            <h1>Blog Topic :{decodedTopic}</h1>
            <div className="icon-container">
              <Link to="/upcoming-blogs">
                <span>
                  <GiFastBackwardButton size={34} />
                </span>
              </Link>
              <div class="tooltip">Go back to upcoming blog </div>
            </div>
          </div>
        </div>
        {/* blog details section */}
        <div className="mt-2">
          <section className="d-flex flex-column">
            <div>
              <div className="my-4">
                <div
                  className="mb- py-3 px-1 d-flex flex-row justify-content-between"
                  style={{
                    borderTop: '3px solid black',
                    borderBottom: '3px solid black',
                  }}
                >
                  <div className="d-flex flex-column">
                    <h4>Author : Fritado</h4>
                    <h4>Published: August 25, 2023</h4>
                  </div>
                  <div>
                    <label class="switch">
                      <input
                        id="toggleButton"
                        type="checkbox"
                        checked={status === 'approved'}
                        onChange={handleToggle}
                        disabled={status === 'approved'}
                      />
                      <span class="slider"></span>
                    </label>
                  </div>
                </div>
                <div
                  className="my-4 d-flex flex-column mx-auto justify-content-center"
                  style={{ maxWidth: '46rem' }}
                >
                  <div className="d-flex flex-column mx-auto">
                    <p
                      contentEditable
                      style={{ border: 'none', outline: 'none', backgroundColor: 'transparent' }}
                      onBlur={handleBlur}
                      onKeyDown={handleKeyDown}
                    >
                      {parse(blogDescription)}
                    </p>
                    <div className="px-4 py-1 position-relative d-flex justify-content-center">
                      <img
                        src={
                          blogDetails?.image
                            ? `https://server.fritado.com/blog-images/${extractImagePath(blogDetails?.image)}`
                            : DefaultBlogImage
                        }
                        alt="blog-post-picture"
                        className="w-100 mb-3"
                        style={{ height: '23rem' }}
                      />
                      {!imageGenerated && (
                        <div
                          className="d-flex flex-column align-items-center position-absolute top-50 start-50 translate-middle border border-2 border-black py-1 px-3"
                          style={{ cursor: 'pointer' }}
                          onClick={handleDownloadImage}
                        >
                          <h6 className="text-black fw-medium">Click to view image</h6>
                          <FiDownload size={24} color="black" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <AuthFooter />
    </div>
  )
}

export default BlogDetails

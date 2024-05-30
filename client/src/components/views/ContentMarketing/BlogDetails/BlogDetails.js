import React, { useState, useEffect } from 'react'
import Header from '../../common/Header'
import { Link } from 'react-router-dom'
import AuthFooter from '../../common/AuthFooter'
import ProfileImg from '../../../../assets/images/Blogs/profile_image.jpg'
import { GiFastBackwardButton } from 'react-icons/gi'
import {
  fetchBlogsByTopic,
  updateBlogDescription,
  approveBlog,
  getBlogStatusByTopic,
} from '../../../services/BlogTopicApi'
import { useParams } from 'react-router-dom'

const decodeTopic = (encodedTopic) => {
  return decodeURIComponent(encodedTopic.replace(/\+/g, ' '))
}
const BlogDetails = () => {
  const { topic } = useParams()
  const decodedTopic = decodeTopic(topic)
  // console.log("topic", decodedTopic);
  const [blogDescription, setBlogDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const [firstParagraph, setFirstParagraph] = useState('')
  const [secondParagraph, setSecondParagraph] = useState('')
  const [status, setStatus] = useState('pending')
  const [editedDescription, setEditedDescription] = useState('')
  const [blogId, setBlogId] = useState('')

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
      //console.log("response" , response);
      if (response.success) {
        setBlogId(response.blogId)
        setBlogDescription(response.data)
        extractParagraphs(response.data)
        setLoading(false)
      } else {
        console.error('Failed to fetch blog details:', response.message)
      }
    } catch (error) {
      console.error('Error fetching blog details:', error)
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
      const ans = await updateBlogDescription(blogId, editedDescription)
     // console.log('blogId', blogId)
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
    setEditedDescription(e.target.innerText)
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
      console.log('Status Response:', blogStatus)
      setStatus(blogStatus)
    } catch (error) {
      console.error('Error fetching blog status:', error)
    }
  }
  const handleToggle = async () => {
    try {
      if (status === 'pending') {
        setStatus('approved')
        const response = await approveBlog(blogId, 'approved')
        if (!response.success) {
          console.error('Failed to approve blog:', response.message)
          setStatus('pending')
        }
      }
    } catch (error) {
      console.error('Error toggling blog status:', error)
    }
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
                      style={{ border: 'none', outline: 'none' }}
                      onBlur={handleBlur}
                      onKeyDown={handleKeyDown}
                    >
                      {firstParagraph}....
                    </p>
                    <div className="px-4 py-1">
                      <img
                        src={ProfileImg}
                        alt="blog-post-picture"
                        className="w-100 mb-3"
                        style={{ height: '23rem' }}
                      />
                    </div>
                    <p
                      contentEditable
                      style={{ border: 'none', outline: 'none' }}
                      onBlur={handleBlur}
                      onKeyDown={handleKeyDown}
                    >
                      {secondParagraph}
                    </p>
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

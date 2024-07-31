import React, { useState, useEffect } from 'react'
import BlogAutomation from './BlogAutomation'
import { IoMdArrowRoundForward } from 'react-icons/io'
import { GoDotFill } from 'react-icons/go'
import { FiUpload } from 'react-icons/fi'
import {
  getRecentBlog,
  getBlogStatusByTopic,
  fetchBlogsByTopic,
  handleBlogImage,
  uploadBlogImage,
  selectBlogImageById,
} from '../../services/BlogTopicApi'
import { formatDate } from '../../services/formatDate'
import parse from 'html-react-parser'
import { useNavigate, Link } from 'react-router-dom'
import { FiDownload } from 'react-icons/fi'
import DefaultBlogImage from '../../../assets/images/default-blog-image.png.jpg'
import { IoChevronForwardSharp } from 'react-icons/io5'
import { IoIosArrowBack } from 'react-icons/io'
import { GiArtificialIntelligence } from 'react-icons/gi'

const BlogOverView = () => {
  const navigate = useNavigate()
  const [recentBlog, setRecentBlog] = useState(null)
  const [upComingBlogs, setUpcomingBlogs] = useState(null)
  const [blogStatus, setBlogStatus] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageGenerated, setImageGenerated] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadStatus, setUploadStatus] = useState('')
  const [imageIndex, setImageIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState()
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1)

  const handleFileChange = async (event) => {
    const selectImage = event.target.files[0];
   // console.log(selectImage ," selectImage")
    if (selectImage) {
      setSelectedFile(selectImage)
    }
    try {
      const blogId = recentBlog._id
      const response = await uploadBlogImage(blogId, selectImage)
      fetchRecentBlog()
      console.log('Upload Image success:', response)
    } catch (error) {
      console.error('Upload error:', error)
    }
  }

  useEffect(() => {
    fetchRecentBlog()
  }, [])

  const fetchRecentBlog = async () => {
    try {
      const Blogresponse = await getRecentBlog()
      const recentBlogData = Blogresponse.data.data.recentBlog
      const upcomingBlogData = Blogresponse.data.data.upcomingBlogs
      const blogTopic = recentBlogData.topic
      const blogStatusByTopic = await getBlogStatusByTopic(blogTopic)
      setRecentBlog(recentBlogData)
      setUpcomingBlogs(upcomingBlogData)
      setBlogStatus(blogStatusByTopic.data)
      setImageGenerated(recentBlogData.blogImage && recentBlogData.blogImage.length > 0)

      setSelectedImage(
        recentBlogData.selectedImage
          ? `http://localhost:4000/blog-images/${extractImagePath(recentBlogData.selectedImage)}`
          : recentBlogData.blogImage && recentBlogData.blogImage.length > 0
            ? `http://localhost:4000/blog-images/${extractImagePath(recentBlogData.blogImage[0])}`
            : DefaultBlogImage,
      )
    } catch (error) {
      console.error('Error fetching recent blog:', error)
    }
  }

  const handleGoToBlogDetails = async () => {
    try {
      if (recentBlog) {
        const res = await fetchBlogsByTopic(recentBlog.topic)
        if (res.success) {
          navigate(`/blog-details/${encodeURIComponent(recentBlog.topic)}`)
        } else {
          console.log(`Failure to fetch blog details:`, res.message)
        }
      } else {
        console.log('No recent blog available.')
      }
    } catch (error) {
      console.error('Error fetching blog details:', error)
    }
  }
  //check this functrion
  const handleDownloadImage = async () => {
    try {
      if (recentBlog) {
        const { _id, topic, blogDescription } = recentBlog
        await handleBlogImage(_id, topic, blogDescription)
        fetchRecentBlog()
      }
    } catch (error) {
      console.error('Error handling blog image:', error)
    }
  }

  const prevBlog = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? upComingBlogs.length - 1 : prevIndex - 1))
  }

  const nextBlog = () => {
    setCurrentIndex((prevIndex) => (prevIndex === upComingBlogs.length - 1 ? 0 : prevIndex + 1))
  }

  const dotColor = blogStatus.status === 'approved' ? 'green' : 'red'

  const extractImagePath = (path) => {
    if (typeof path === 'string') {
      const basePath = 'F:\\Fritado - WEBSITE\\Portal-platform\\server\\controllers\\BlogImage\\'
      const extractedPath = path.replace(basePath, '').replace(/\\/g, '/')
      return extractedPath
    }
    return ''
  }

  const prevBlogImage = () => {
    setImageIndex((prevIndex) =>
      prevIndex === 0 ? recentBlog.blogImage.length - 1 : prevIndex - 1,
    )
    setSelectedImageIndex(-1)
  }

  const nextBlogImage = () => {
    setImageIndex((prevIndex) => (prevIndex === recentBlog.blogImage - 1 ? 0 : prevIndex + 1))
    setSelectedImageIndex(-1)
  }
  const handleImageSelect = async (imagePath, index) => {
    try {
      await selectBlogImageById(recentBlog._id, imagePath)
      setSelectedImage(`http://localhost:4000/blog-images/${extractImagePath(imagePath)}`)
      setSelectedImageIndex(index)
    } catch (error) {
      console.error('Error selecting blog image:', error)
    }
  }
  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    return doc.body.textContent || ''
  }

  return (
    <div className="container mx-auto">
      <BlogAutomation />
      <div className="d-flex flex-row mb-4 mx-4">
        <div className="bg-white py-3">
          <div id="Current" className="d-flex flex-column px-4 my-2 bg-white">
            <div className="p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Current blog posts</h3>
                <button className="border-0 rounded px-3 py-2" onClick={handleGoToBlogDetails}>
                  View Blog
                  <span className="ps-1">
                    <IoMdArrowRoundForward />
                  </span>
                </button>
              </div>
              <p>
                This blog is scheduled for publication. Please review it promptly to ensure timely
                posting.
              </p>
            </div>

            {recentBlog && (
              <div className="mx-4 my-3 blog-card border rounded">
                <div className="position-relative">
                  <img
                    src={selectedImage || DefaultBlogImage}
                    alt="Blog-post-image"
                    className="w-100  mb-3"
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
                <div className="p-2 d-flex flex-row gap-3  align-items-center">
                  {recentBlog.blogImage && recentBlog.blogImage.length > 2 && (
                    <span className="border-0" onClick={prevBlogImage}>
                      <IoIosArrowBack size={30} color="#0a3a4c7a" />
                    </span>
                  )}
                  <div className=" d-flex flex-row">
                    {recentBlog.blogImage &&
                      recentBlog.blogImage
                        .slice(imageIndex, imageIndex + 2)
                        .map((imagePath, index) => (
                          <div
                            key={index}
                            onClick={() => handleImageSelect(imagePath, index)}
                            className={`${selectedImageIndex === index ? 'border border-primary' : ''}`}
                          >
                            <img
                              src={`http://localhost:4000/blog-images/${extractImagePath(imagePath)}`}
                              alt={`Blog Image ${index + 1}`}
                              className="img-thumbnail me-2"
                              style={{ maxWidth: '100px', cursor: 'pointer' }}
                            />
                          </div>
                        ))}
                  </div>
                  {recentBlog.blogImage && recentBlog.blogImage.length > 2 && (
                    <span className="border-0" onClick={nextBlogImage}>
                      <IoChevronForwardSharp size={30} color="#0a3a4c7a" />
                    </span>
                  )}
                  <div className="custom-file-upload position-relative" style={{ left: '80px' }}>
                    <label htmlFor="file-upload" className="" style={{ cursor: 'pointer' }}>
                      <FiUpload size={34} color="#004a65" />
                    </label>
                    <input
                      type="file"
                      id="file-upload"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>

                <div className="p-2">
                  <div className="">
                    <h3 onClick={handleGoToBlogDetails} style={{ cursor: 'pointer' }}>
                      {recentBlog.topic}
                    </h3>
                    <p>{parse(stripHtmlTags(recentBlog.blogDescription).substring(0, 100))}...</p>
                  </div>

                  <div className="d-flex flex-column">
                    <div className="d-flex flex-row my-3 fs-6 fw-semibold">
                      <span className="pe-1">
                        <GiArtificialIntelligence size={20} />
                      </span>
                      Fritado AI
                    </div>
                    <div className="d-flex flex-column flex-md-row m-2 justify-content-between">
                      <div className="mb-2">
                        <button className="border-0 rounded py-2 px-3">
                          <span className="pe-1" style={{ color: dotColor }}>
                            <GoDotFill size={24} />
                          </span>
                          {blogStatus.status}
                        </button>
                      </div>
                      <div>
                        <button className="border-0 rounded py-2 px-3">
                          <span className="pe-1">
                            <GoDotFill size={24} />
                          </span>
                          Publish on {blogStatus.publishDate}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div id="Upcoming" className="d-flex flex-column py-2 mx-4 px-4 border-top">
            <div className="p-3 d-flex justify-content-between align-items-center">
              <h3>Upcoming blog posts</h3>
            </div>

            <div className="d-flex flex-column flex-md-row align-items-center justify-content-center">
              <span
                className="me-3"
                onClick={prevBlog}
                disabled={upComingBlogs && upComingBlogs.length <= 1}
              >
                <IoIosArrowBack size={34} color="black" />
              </span>

              <div className="row  flex-nowrap overflow-auto">
                {upComingBlogs &&
                  upComingBlogs.slice(currentIndex, currentIndex + 2).map((blog, index) => (
                    <div key={index} className="col-md-6">
                      <div className="border rounded p-3 mb-3">
                        <Link to="/upcoming-blogs">
                          <h6 className="truncated-topic">
                            {blog.topic.substring(0, 35)}...
                            <span className="full-topic">{blog.topic}</span>
                          </h6>
                        </Link>

                        <div className="d-flex flex-column">
                          <div className="d-flex flex-row my-2 px-2">
                            <span className="pe-1">
                              <GiArtificialIntelligence size={20} />
                            </span>
                            Fritado AI
                          </div>
                          <div className="my-2 d-flex flex-row ">
                            <button className="border-0 rounded py-2 px-3">
                              <span className="pr-1">
                                <GoDotFill size={24} />
                              </span>
                              Published on {formatDate(blog.PublishDate)}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="d-flex align-items-center ms-3 justify-content-center">
                <span onClick={nextBlog} disabled={upComingBlogs && upComingBlogs.length <= 1}>
                  <IoChevronForwardSharp size={34} color="black" />
                </span>
              </div>
            </div>
          </div>

          <div id="Recent" className="d-flex flex-column border-top py-2 mx-4 px-4">
            <div className="p-3">
              <div className="d-flex justify-content-between">
                <h3>Recent blog posts</h3>
                <a href="/blog-history">
                  <span className="ps-1">
                    <IoMdArrowRoundForward />
                  </span>
                </a>
              </div>
              <p>Check out your latest blog post right here!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogOverView

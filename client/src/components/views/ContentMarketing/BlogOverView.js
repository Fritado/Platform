import React, { useState, useEffect } from 'react'
import BlogAutomation from './BlogAutomation'
import { Link } from 'react-router-dom'
import { IoMdArrowRoundForward, IoMdArrowRoundBack } from 'react-icons/io'
import ProfileImg from '../../../assets/images/Blogs/profile_image.jpg'
import { GoDotFill } from 'react-icons/go'
import { FiKey } from 'react-icons/fi'
import { getRecentBlog, getBlogStatusByTopic, fetchBlogsByTopic } from '../../services/BlogTopicApi'
import { useNavigate } from 'react-router-dom'

const BlogOverView = () => {
  const navigate = useNavigate()
  const [recentBlog, setRecentBlog] = useState(null)
  const [upComingBlogs, setUpcomingBlogs] = useState(null)
  const [blogStatus, setBlogStatus] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleItemClick = (id) => {
    setSelectedItemId(id)
  }

  const fetchRecentBlog = async () => {
    try {
      const Blogresponse = await getRecentBlog()
      console.log(Blogresponse, 'Blogresponse')
      const recentBlogData = Blogresponse.data.data.recentBlog
      const upcomingBlogData = Blogresponse.data.data.upcomingBlogs

      const blogTopic = recentBlogData.topic
      const blogStatusByTopic = await getBlogStatusByTopic(blogTopic)
      //console.log("Blogresponse" , Blogresponse)
      // console.log('upcomingBlogData', upcomingBlogData)

      setRecentBlog(recentBlogData)
      setUpcomingBlogs(upcomingBlogData)
      setBlogStatus(blogStatusByTopic.data)
    } catch (error) {
      console.error('Error fetching recent blog:', error)
    }
  }

  const handleGoToBlogDetails = async () => {
    try {
      if (recentBlog) {
        const res = await fetchBlogsByTopic(recentBlog.topic)
        //  console.log(recentBlog.topic)

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

  const prevBlog = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? upComingBlogs.length - 1 : prevIndex - 1))
  }

  const nextBlog = () => {
    setCurrentIndex((prevIndex) => (prevIndex === upComingBlogs.length - 1 ? 0 : prevIndex + 1))
  }
  useEffect(() => {
    fetchRecentBlog()
  }, [])
  const dotColor = blogStatus.status === 'approved' ? 'green' : 'red'

  const extractImagePath = (path) => {
    const basePath = "F:\\Fritado - WEBSITE\\Portal-platform\\server\\controllers\\BlogImage\\";
    return path.replace(basePath, "").replace(/\\/g, "/");
  };
 
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
                <img
                  src={`http://localhost:4000/blog-images/${extractImagePath(recentBlog.blogImage)}`}
                  alt="blog-post-picture"
                  className="w-100 mb-3"
                />
                <div className="p-2">
                  <div className="">
                    <h3>{recentBlog.topic}</h3>
                    <p>{recentBlog.blogDescription.substring(0, 200)}...</p>
                  </div>

                  <div className="d-flex flex-column">
                    <div className="d-flex flex-row my-3">
                      <span className="pe-2">
                        <FiKey size={20} />
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

            <div className="d-flex flex-column flex-md-row">
              <div className="d-flex align-items-center justify-content-center">
                <span className="me-3" onClick={prevBlog}>
                  <IoMdArrowRoundBack size={24} color="black" />
                </span>
              </div>
              <div className="row">
                {upComingBlogs &&
                  upComingBlogs.slice(currentIndex, currentIndex + 2).map((blog, index) => (
                    <div key={index} className="col-md-6">
                      <div className="border rounded p-3 mb-3">
                        <h5>{blog.topic}</h5>
                        <div className="d-flex flex-column">
                          <div className="d-flex flex-row my-2 px-2">
                            <span className="pr-2">
                              <FiKey size={24} />
                            </span>
                            Financial Fritado ai
                          </div>
                          <div className="my-2 d-flex flex-row ">
                            <button className="border-0 rounded py-2 px-3">
                              <span className="pr-1">
                                <GoDotFill size={24} />
                              </span>
                              Available {blogStatus.publishDate}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="d-flex align-items-center ms-3 justify-content-center">
                <span onClick={nextBlog}>
                  <IoMdArrowRoundForward size={24} color="black" />
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

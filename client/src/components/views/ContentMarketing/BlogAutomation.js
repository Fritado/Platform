import React, { useState, useEffect } from 'react'
import { IoArrowUpCircleOutline} from 'react-icons/io5'
import MenuHeader from '../common/MenuHeader'

const BlogtabsName = [
  { id: '1', title: 'Overview', path: '/blog-automation' },
  { id: '2', title: 'Upcoming Blog Posts', path: '/upcoming-blogs' },
  
]
const BlogAutomation = () => {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScrollButtonVisibility = () => {
      window.scrollY > 300 ? setShowButton(true) : setShowButton(false)
    }
    window.addEventListener('scroll', handleScrollButtonVisibility)

    return () => {
      window.removeEventListener('scroll', handleScrollButtonVisibility)
    }
  }, [])

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className="">
     <div className="container mx-auto my-2 ">
     <div className="page-header">
        <h2 className="text-dark fw-semibold mb-2"> Blog Automation</h2>
      </div>
      <MenuHeader tabsName={BlogtabsName} />
    </div>

      {/* scroll to top */}
      {showButton && (
        <div className={`position-relative mb-4 scrollToTop ms-2 `} style={{ float: 'right' }}>
          <span
            onClick={handleScrollToTop}
            className="cursor-pointer position-fixed ps-1"
            style={{
              bottom: '5.5rem',
            }}
          >
            <IoArrowUpCircleOutline size={32} color="black" />
          </span>
        </div>
      )}
    </div>
  )
}

export default BlogAutomation

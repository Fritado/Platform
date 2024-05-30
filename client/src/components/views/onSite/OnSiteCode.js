import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoArrowUpCircleOutline } from 'react-icons/io5';
import MenuHeader from '../common/MenuHeader';

const OnSitetabsName = [
  { id: '1', title: 'Overview', path: '/onsite-code' },
  { id: '2', title: 'PageSpeed Insights', path: '/on-site-pagespeed' },
  { id: '3', title: 'Preview', path: '#' },
  { id: '4', title: 'Settings', path: '#' },
]

const OnSiteCode = () => {
  const [showButton, setShowButton] = useState(false);
  

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
    <div className="mx-4">
      <div className="d-sm-flex page-header" style={{ marginLeft: '0px', marginBottom: '10px' }}>
        <h1 className="text-dark fw-semibold"> Code Change</h1>
      </div>
      <MenuHeader tabsName={OnSitetabsName}/>
      {/* scroll to top */}
      {showButton && (
        <div className={`position-relative mb-4 scrollToTop ms-2`} style={{ float: 'right' }}>
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

export default OnSiteCode

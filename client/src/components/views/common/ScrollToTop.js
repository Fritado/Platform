import React, { useState, useEffect } from 'react'
import { IoArrowUpCircleOutline } from 'react-icons/io5'
const ScrollToTop = () => {
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
    <>
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
    </>
  )
}

export default ScrollToTop

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoArrowUpCircleOutline } from 'react-icons/io5'
import ScrollToTop from '../common/ScrollToTop';
import MenuHeader from '../common/MenuHeader';

const BillingPlansabsName = [
  { id: '1', title: 'Overview', path: '/billing-and-plan' },
  { id: '2', title: 'Plans', path: '#' },
  { id: '3', title: 'History', path: '#' },
  { id: '4', title: 'Payment Methods', path: '#' },
]
const BillingPlans = () => {
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
    <div className="mx-4">
      <div className="d-sm-flex " style={{ marginLeft: '0px', marginBottom: '10px' }}>
        {/* <h1 className="text-dark fw-semibold">Billing & Plan</h1> */}
        <div className="d-flex flex-row">
          {/* <span className="pe-2"><MdEmail size={26}/></span> */}
          <h2 className="text-dark fw-normal pe-3">Billing & Plan</h2>
        </div>
      </div>
      <MenuHeader tabsName={BillingPlansabsName} />
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

export default BillingPlans

import React from 'react'
import Header from '../common/Header'
import AuthFooter from '../common/AuthFooter'
import { IoSearch } from 'react-icons/io5'
import HelpCenterCard from './HelpCenterCard'
import { Link } from 'react-router-dom'
import SelfService from './selfService/SelfService'

const HelpCenterPage = () => {
  return (
    <div>
      <Header />
      {/* Search bar */}
      <div className="px-4 mt-4 align-items-center" style={{ marginRight: '3rem', marginLeft: '3rem' }}>
        <div className="mt-3 d-flex flex-column justify-content-center">
          <h1>Advice and answers from the StyleAI Team</h1>

          <span className=" position-relative" style={{ top: '40px', zIndex: '1' }}>
            <IoSearch size={25} style={{ marginRight: '15px', float: 'right' }} />
          </span>
          <input
            type="search"
            placeholder="Search here"
            className="px-4 py-3 border mb-3 position-relative"
            style={{ borderRadius: '10px' }}
          />
        </div>

        {/* 3 cards will display here */}
        <div className="d-flex justify-content-center gap-5 mt-4">
          <HelpCenterCard
            heading="Self Services"
            para="something about fritado will go here lets wait"
          />

          <HelpCenterCard
            heading="Client Care"
            para="something about fritado will go here lets wait"
          />
          <HelpCenterCard
            heading="Create a Ticket"
            para="something about fritado will go here lets wait"
          />
        </div>
        <div className="mt-4 pt-4">
          <SelfService />
        </div>
      </div>
      <AuthFooter />
    </div>
  )
}

export default HelpCenterPage
// self service
// client care
// create a ticket

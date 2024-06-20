import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MenuHeader from '../common/MenuHeader'


const SocialMediaTabsName = [
  { id: '1', title: 'Website', path: '/website-connect' },
  { id: '2', title: 'Social medias', path: '/connect-social-medias' },
]

const ConnectOverview = () => {
  const [selectedTab, setSelectedTab] = useState('Overview')
  return (
    <div className="mx-4">
      <div className="d-sm-flex page-header" style={{ marginLeft: '0px', marginBottom: '10px' }}>
        <h1 className="text-dark fw-semibold">Connect API channels</h1>
      </div>
      <MenuHeader tabsName={SocialMediaTabsName} />

      
    </div>
  )
}

export default ConnectOverview

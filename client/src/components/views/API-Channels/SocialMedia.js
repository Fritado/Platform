import React, { useState } from 'react'
import SocialMediaCard from './SocialMediaComponents/socialMediaCard'
import { Link } from 'react-router-dom'
import ConnectOverview from './ConnectOverview'

const SocialMedia = () => {
 
  return (
    <div className="">
      <ConnectOverview />
      <div>
        <SocialMediaCard />
      </div>
    </div>
  )
}

export default SocialMedia

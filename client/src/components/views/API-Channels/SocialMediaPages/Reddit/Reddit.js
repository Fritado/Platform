import React from 'react'
import SocialMediaForm from '../../SocialMediaComponents/SocialMediaForm'
import { FaRedditSquare } from "react-icons/fa";
const Reddit = () => {
  const dataForPage1 = [
    {
      id: 1,
      name: 'Thomas IT',
      appId: '1443447836154206',
      appSecret: 'XXXXXXXXXXX',
      status: 'Active',
    },
    // Add more data as needed
  ]

  const headersForPage1 = ['#', 'App name', 'App id', 'App secret', 'Status']
  return (
    <div>
      <SocialMediaForm
       icon={<FaRedditSquare size={34} color="red" />}
      heading={'Reddit app setting'}
        data={dataForPage1}
        headers={headersForPage1}
        appSettingRoute={'/reddit-app-setting'}
      />
    </div>
  )
}

export default Reddit

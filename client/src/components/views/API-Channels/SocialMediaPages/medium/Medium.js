import React from 'react'
import SocialMediaForm from '../../SocialMediaComponents/SocialMediaForm'
import { FaMedium } from "react-icons/fa";

const Medium = () => {
  const dataForPage1 = [
    {
      id: 1,
      name: 'Maria IT',
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
      icon={<FaMedium size={34} color="" />}
      heading={'Medium app setting'}
        data={dataForPage1}
        headers={headersForPage1}
        appSettingRoute={'/medium-app-setting'}
      />
    </div>
  )
}

export default Medium

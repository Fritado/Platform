import React from 'react'
import SocialMediaForm from '../../SocialMediaComponents/SocialMediaForm'
import { FaFacebookSquare } from 'react-icons/fa'

const Facebook = () => {
  const dataForPage1 = [
    {
      id: 1,
      name: 'Xerone IT',
      appId: '1443447836154206',
      appSecret: 'XXXXXXXXXXX',
      status: 'Active',
    },
    {
      id: 1,
      name: 'Xerone IT',
      appId: '1443447836154206',
      appSecret: 'XXXXXXXXXXX',
      status: 'Active',
    },

    // Add more data
  ]

  const headersForPage1 = ['#', 'App name', 'App id', 'App secret', 'Status']
  return (
    <div>
      <SocialMediaForm
        icon={<FaFacebookSquare size={34} color="rgb(97 116 221)" />}
        heading={"Facebook app settings"}
        data={dataForPage1}
        headers={headersForPage1}
        appSettingRoute={'/fb-app-setting'}
      />
    </div>
  )
}

export default Facebook

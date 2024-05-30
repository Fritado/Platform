import React from 'react'
import SocialMediaForm from '../../SocialMediaComponents/SocialMediaForm'
import { FaLinkedin } from 'react-icons/fa6';

const Linkedin = () => {
  const dataForPage1 = [
    {
      id: 1,
      name: 'Jhon IT',
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
        icon={<FaLinkedin size={34} color="rgb(44 122 185)"  />}
      heading={'Linkedin app setting'}
        data={dataForPage1}
        headers={headersForPage1}
        appSettingRoute={'/linkedin-app-setting'}
      />
    </div>
  )
}

export default Linkedin

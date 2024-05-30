import React from 'react'
import ConnectwebTable from './ConnectwebTable'
import { RiProfileLine } from "react-icons/ri";
import ConnectOverview from '../ConnectOverview'

const ConnectWebsite = () => {
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
  const headersForPage1 = ['#', 'Website name', 'Type', 'Technology', 'Status' , "Action"]
  return (
    <div>
      <ConnectOverview />
      <div className='my-3'>
        <ConnectwebTable
          icon={<RiProfileLine size={34} color="rgb(97 116 221)" />}
          heading={'Connect website'}
          data={dataForPage1}
          headers={headersForPage1}
          appSettingRoute={'/add-website'}
        />
      </div>
    </div>
  )
}

export default ConnectWebsite

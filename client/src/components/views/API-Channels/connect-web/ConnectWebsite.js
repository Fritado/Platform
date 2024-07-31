import React, { useEffect ,useState} from 'react'
import ConnectwebTable from './ConnectwebTable'
import { RiProfileLine } from 'react-icons/ri'
import ConnectOverview from '../ConnectOverview'
import { fetchWebsiteDetails } from '../../../services/ConnectWebsite/WebsiteSelection'

const ConnectWebsite = () => {
  const [websiteData, setWebsiteData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await fetchWebsiteDetails()
        setWebsiteData(responseData)
      } catch (error) {
        console.error('Error fetching website details:', error)
      }
    }

    fetchData()
  }, [])

 
  const headersForPage1 = ['#', 'App domain', 'Type', 'Technology', 'Status', 'Action']
  return (
    <div>
      <ConnectOverview />
      <div className="my-3">
        <ConnectwebTable
          icon={<RiProfileLine size={34} color="rgb(97 116 221)" />}
          heading={'Connect website'}
          data={websiteData.map((item, index) => ({
            id: index + 1,
            domain: item.projectName,         
            type: item.websiteType,
            technology: item.technology,
            Status:item.websiteConnection,
          }))}
          headers={headersForPage1}
          appSettingRoute={'/add-website'}
        />
      </div>
    </div>
  )
}

export default ConnectWebsite

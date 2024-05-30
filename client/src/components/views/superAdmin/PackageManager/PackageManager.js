import React, { useState, useEffect } from 'react'
import PackageManagerCard from './PackageManagerCard'
import { HiLockClosed } from 'react-icons/hi2'
import { fetchAllPackages } from '../../../services/Subscription/PackageManagerService'

const PackageManager = () => {
  const [data, setData] = useState([])
  if (data === null) {
    return <div>Loading...</div>
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const packageRes = await fetchAllPackages()
        setData(packageRes.packages)
      } catch (error) {
        console.error('Error fetching packages:', error)
      }
    }
    fetchData()
  }, [])
  const headersForPage1 = [
    '#',
    'Package name',
    'Price - USD',
    'Validity - Days',
    'Default package',
    'Actions',
  ]
  return (
    <div>
      <PackageManagerCard
        icon={<HiLockClosed size={34} color="" />}
        heading={'Package Manager'}
        data={data}
        headers={headersForPage1}
        appSettingRoute={'/admin/package-manager-add-package'}
      />
    </div>
  )
}

export default PackageManager

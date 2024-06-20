import React, { useState, useEffect } from 'react'
import { RiProfileLine } from 'react-icons/ri'
import WebsiteIntegrationForm from './WebsiteIntegrationForm'
import { getDomianName } from '../../../services/BusinessDomain/domain'
import axios from 'axios'

const ConnectAddWebsite = () => {
  const [domainData, setDomainData] = useState({
    fullUrl: null,
    domainName: null,
    webhookUrl: null,
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDomainName()
  }, [])

  const fetchDomainName = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('Token not found')
      }
      const domainInfo = await getDomianName(token)
      setDomainData(domainInfo)
    } catch (error) {
      console.error('Error while fetching domain name', error)
      setLoading(false)
    }
  }

  const title1 = {
    icon: <RiProfileLine size={34} color="rgb(97 116 221)" />,
    text: 'Website integration',
  }

  const appDetails1 = [
    { label: 'App domain', value: domainData.domainName || 'Loading...' },
    { label: 'Site url', value: domainData.fullUrl || 'Loading...' },
    { label: 'Webhook callback url ', value: domainData.webhookUrl || 'Loading...' },
  ]

  return (
    <div>
      <WebsiteIntegrationForm
        title={title1}
        appDetails={appDetails1}
        webhookUrl={domainData.webhookUrl}
      />
    </div>
  )
}

export default ConnectAddWebsite

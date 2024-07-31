import React, { useState, useEffect } from 'react'
import { PiPlugsConnectedDuotone } from 'react-icons/pi'
import { BsFileEarmarkCodeFill } from 'react-icons/bs'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const PhpIntegration = ({ webhookUrl, websiteData, saveWebsiteType }) => {
  const [buttonStatus, setButtonStatus] = useState('inactive')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const storedStatus = localStorage.getItem(`buttonStatus-${token}`)
      if (storedStatus) {
        setButtonStatus(storedStatus)
      }
    }
  }, [])

  const checkWebhookUrlStatus = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('Token not found')
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      const response = await axios.head(
        `/api/check-webhook?url=${encodeURIComponent(webhookUrl)}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      // console.log('Webhook check response:', response)

      if (response.status === 200 && response.data === '') {
        setButtonStatus('active')
        localStorage.setItem(`buttonStatus-${token}`, 'active')
        toast.success('Connection succesfulll.')
        return 'active'
      } else {
        setButtonStatus('inactive')
        localStorage.setItem(`buttonStatus-${token}`, 'inactive')
        setErrorMessage('Connection failed. Please try again later.')

        return 'inactive'
      }
    } catch (error) {
      //console.error('Error while checking webhook status', error)
      setButtonStatus('inactive')
      setErrorMessage('Connection failed. Please try again later.')

      throw error
    }
  }

  const handleButtonClick = async () => {
    setButtonStatus('connecting')
    setErrorMessage('')

    const status = await checkWebhookUrlStatus()
    const { webType, tech } = websiteData

    if (status === 'active') {
      await saveWebsiteType({ websiteType: webType, technology: tech })
      navigate('/website-connect')
    } else {
      setButtonStatus('inactive')
    }
  }

  const renderButton = () => {
    let buttonClass = 'mt-1 fs-6 border rounded px-3 py-2 '
    let buttonText = ''

    switch (buttonStatus) {
      case 'connecting':
        buttonClass += 'btn-secondary'
        buttonText = 'Connecting...'
        break
      case 'active':
        buttonClass += 'btn-success'
        buttonText = 'Connected'
        break
      case 'inactive':
      default:
        buttonClass += 'btn-primary'
        buttonText = 'Connect'
        break
    }

    return (
      <button
        className={buttonClass}
        onClick={handleButtonClick}
        disabled={buttonStatus === 'active' || buttonStatus === 'connecting'}
      >
        <span className="pe-2">
          <PiPlugsConnectedDuotone size={20} />
        </span>
        {buttonText}
      </button>
    )
  }
  const instructions = [
    { label: 'Create a folder named "fritado" in the root directory.' },
    { label: 'Upload the downloaded file into the "fritado" directory.' },
    { label: 'Do not modify the "webhook.php" file. ' },
    { label: `Access the sample URL at ${webhookUrl}. ` },
    {
      label:
        'After creating the folder and uploading the downloaded "webhook.php" file, click the verify button to integrate your website with Fritado AI.',
    },
  ]
  return (
    <div className="d-flex mx-auto mb-3">
      <section className="">
        <div className="d-flex flex-column">
          <div className="d-flex flex-wrap gap-3">
            {/* App details */}
            <div className="bg-white p-3" style={{ flex: '1' }}>
              <h3>Instructions</h3>
              <ul>
                {instructions.map((rule, index) => (
                  <li key={index} style={{ listStyle: 'square' }}>
                    {rule.label}
                  </li>
                ))}
              </ul>
            </div>
            {/* Valid oauth redirect uri */}
            <div className="bg-white p-3">
              <p className="fs-6">
                <strong>Download webhook file and upload in your main folder</strong>
              </p>
              <div className="d-flex flex-column mx-auto justify-content-center align-items-center mt-4">
                <span className="">
                  <a href="/webhook.zip" download>
                    <BsFileEarmarkCodeFill size={90} color="#f48122" />
                  </a>
                </span>
                <h4 className="mt-3">Webhook.php</h4>
              </div>
              <div className="d-flex mx-auto justify-content-center">{renderButton()}</div>
              {buttonStatus === 'inactive' && errorMessage && (
                <h6 className="text-danger text-center mt-3">{errorMessage}</h6>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PhpIntegration

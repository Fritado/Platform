import React, { useState, useEffect } from 'react'
import { PiPlugsConnectedDuotone } from 'react-icons/pi'
import { BsFileEarmarkCodeFill } from 'react-icons/bs'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { updateWebsiteConnectionStatus } from '../../../../services/ConnectWebsite/WebsiteSelection'

const WordPressIntegration = ({ webhookUrl, websiteData, saveWebsiteType }) => {
  const [buttonStatus, setButtonStatus] = useState('inactive')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const renderButton = () => {
    let buttonClass = 'mt-1 fs-6 border rounded px-3 py-2 '
    let buttonText = ''

    const checkPluginStatus = async () => {
      try {
        setButtonStatus('connecting')
        const response = await axios.get('https://a2delight.com/wp-json/fritadoai/v1/status')
        if (response.data.status === 'active') {
          setButtonStatus('active')
          toast.success('Plugin is successfully connected!')
        } else {
          setButtonStatus('inactive')
          setErrorMessage('Plugin is not active. Please ensure it is installed and activated.')
        }
      } catch (error) {
        console.error('Error checking plugin status:', error)
        setButtonStatus('inactive')
        setErrorMessage('There was an error connecting to the plugin. Please try again.')
      }
    }

    const handleButtonClick = async () => {
      const isPluginActive = checkPluginStatus()
      const { webType, tech } = websiteData

      if (isPluginActive) {
        const { webType, tech } = websiteData
        const response = await saveWebsiteType({ websiteType: webType, technology: tech })

        const websiteId = response.data._id

        await updateWebsiteConnectionStatus(websiteId, 'Active')

        navigate('/website-connect')
      }
    }

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
    {
      title: 'Download the Plugin: ',
      label: `Go to the plugin's website or the WordPress Plugin Repository and download the plugin's zip file to your computer.`,
    },
    {
      title: 'Upload the Plugin: ',
      label: `In the WordPress Admin Panel, go to "Plugins" > "Add New" and click the "Upload Plugin" button at the top`,
    },
    {
      title: 'Choose the File: ',
      label: `Click "Choose File", select the plugin's zip file from your computer, and then click "Install Now".`,
    },
    {
      title: 'Activate the Plugin:',
      label: `Once the upload and installation are complete, click "Activate Plugin".`,
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
                  <div key={index} className="d-flex flex-row">
                    <h6 className="fw-semibold">{rule.title}</h6>
                    <p>{rule.label}</p>
                  </div>
                ))}
              </ul>
            </div>
            {/* Valid oauth redirect uri */}
            <div className="bg-white p-3">
              <p className="fs-6">
                <strong>Download plugin and upload in your WP Admin</strong>
              </p>
              <div className="d-flex flex-column mx-auto justify-content-center align-items-center mt-5">
                <span className="">
                  <a href="/fritdaoai.php" download>
                    <BsFileEarmarkCodeFill size={90} color="#f48122" />
                  </a>
                </span>
                <h4 className="mt-3">WordPress Plugin</h4>
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

export default WordPressIntegration

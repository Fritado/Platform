import React from 'react'
import { RiProfileLine } from "react-icons/ri";
import SocialMediaAddApp from '../SocialMediaComponents/SocialMediaAddApp'

const ConnectAddWebsite = () => {
    const title1 = {
        icon: <RiProfileLine size={34} color="rgb(97 116 221)" />,
        text: 'Website integration',
      }
      const appDetails1 = [
        { label: 'App domain', value: 'demo.chatpion.com' },
        { label: 'Site url', value: 'https://demo.chatpion.com/' },
        { label: 'Privacy policy url ', value: ' https://demo.chatpion.com/home/privacy_policy' },
        { label: 'Terms of service url', value: 'https://demo.chatpion.com/home/terms_use' },
        {
          label: 'Webhook callback url',
          value: 'https://demo.chatpion.com/home/central_webhook_callback/',
        },
        { label: 'Webhook verify token', value: ' 1172852879' },
    
        // Add more details as needed
      ]
      const oauthRedirectUris1 = [
        'https://demo.chatpion.com/home/facebook_login_back',
        'https://demo.chatpion.com/home/redirect_rx_link',
        'https://demo.chatpion.com/social_accounts/manual_renew_account',
      ]
      const handleSave1 = () => {
        // Handle save action for Page 1
      }
    
      const handleCancel1 = () => {
        // Handle cancel action for Page 1
      }
  return (
    
      <div>
      <SocialMediaAddApp
        title={title1}
        appDetails={appDetails1}
        oauthRedirectUris={oauthRedirectUris1}
        onSave={handleSave1}
        onCancel={handleCancel1}
      />
   
    </div>
  )
}

export default ConnectAddWebsite

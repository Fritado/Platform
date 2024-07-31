import React from 'react'
import ContactForm from './ContactForm'
import { HiOutlineUserGroup } from 'react-icons/hi'
const Contact = () => {
  const user = [{ Name: 'Anisha', email: 'anisha@gmail.com' }]

  const headersForPage1 = [
    '#',
    '',
    'Date',
    'Source',
    'Avatar',
    'Name',
    'Email',
    'Contact no',
    'Message',
    'Action',
    
  ]

  return (
    <div>
      <ContactForm
        icon={<HiOutlineUserGroup size={26} />}
        heading={'Contact'}
        data={user}
        headers={headersForPage1}
        
      />
    </div>
  )
}

export default Contact

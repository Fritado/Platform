import React, { useEffect, useState } from 'react'
import { HiOutlineUserGroup } from 'react-icons/hi'
import UserManagerCard from './UserManagerCard'
import { fetchUserInfo } from '../../../services/Subscription/UsermanagerService'

const UserManager = () => {
  const [users, setUsers] = useState([])

  const headersForPage1 = [
    '#',
    '',
    'Avatar',
    'Name',
    'Email',
    'User id',
    'Pacakge',
    'Status',
    'Expiry',
    'Action',
    'Registered',
    'Lastlogin',
    'Last ip',
  ]

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await fetchUserInfo()

        if (response.success) {
          const filteredUsers = response.users.filter((user) => user.role === 'user')
          // console.log(filteredUsers , "filteredUsers")
          setUsers(filteredUsers)
        } else {
          console.error('Failed to fetch user data')
        }
      } catch (error) {
        console.error('Error fetching user info:', error)
      }
    }

    getUserInfo()
  }, [])

  return (
    <div>
      <UserManagerCard
        icon={<HiOutlineUserGroup size={34} />}
        heading={'User Manager'}
        data={users}
        headers={headersForPage1}
      />
    </div>
  )
}

export default UserManager

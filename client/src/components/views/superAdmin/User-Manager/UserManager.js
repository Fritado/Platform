import React, { useEffect, useState } from 'react'
import { HiOutlineUserGroup } from 'react-icons/hi'
import UserManagerCard from './UserManagerCard'
import { fetchUserInfo ,deleteUser } from '../../../services/Subscription/UsermanagerService'


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
        const response = await fetchUserInfo();
        if (response.success) {
          const filteredUsers = response.users.filter((user) => user.role === 'user')
          //console.log(filteredUsers , "filteredUsers")
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

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      // Refresh or update user list after deletion
      const updatedUsers = users.filter(user => user._id !== userId);
      console.log(updatedUsers , "updatedUsers")
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <UserManagerCard
        icon={<HiOutlineUserGroup size={34} />}
        heading={'User Manager'}
        data={users}
        headers={headersForPage1}
        onDeleteUser={handleDeleteUser}
      />
    </div>
  )
}

export default UserManager

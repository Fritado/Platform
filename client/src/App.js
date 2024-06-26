import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useColorModes } from '@coreui/react'
import './scss/style.scss'
import AppRoutes from './AppRoutes'
import { useNavigate } from 'react-router-dom'
import { getUserDetails } from './components/services/Auth/AuthApi'

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)

  useEffect(() => {

    const fetchUserDetails = async () => {
      try {
        const userDetails = await getUserDetails();
      //  console.log(userDetails, "userDetails");
        setUserData(userDetails);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    };

    fetchUserDetails();
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }
    if (isColorModeSet()) {
      return
    }
    setColorMode(storedTheme)
  }, [])

  useEffect(() => {
    if (userData && userData.role === 'user' && !userData.stepsCompleted) {
      console.log("calling");
      navigate(userData.lastVisited);
    }
  }, [userData]);

  return <AppRoutes />
}

export default React.memo(App)

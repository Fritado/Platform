import React from 'react'
import { IoMdLogOut } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../../slice/authSlice'
import Logo from '../../../assets/images/logo2.png'

const Header = () => {
  const dispatch = useDispatch()
  const storedUser = JSON.parse(localStorage.getItem('user'))
  const FirstName = storedUser.firstname
  const LastName = storedUser.lastname

  const handleLogoutBtn = () => {
    dispatch(logoutUser())
    window.location.href = '/login'
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div
          className="d-flex flex-row justify-content-between  align-items-center w-100"
          style={{ marginLeft: '3rem', marginRight: '3rem' }}
        >
          <a className="navbar-brand" href="#">
            <img
              src={Logo}
              alt="logo"
              className="d-inline-block align-top"
              style={{ height: '3rem', maxWidth: '200px' }}
            />
          </a>
          <div className="d-flex flex-row">
            <div className="collapse navbar-collapse d-flex align-items-center " id="navbarNav">
              <ul className="navbar-nav ms-auto d-flex align-items-center">
                <li className="nav-item">
                  <p className="nav-link text-dark">
                    <strong>Hello,</strong>
                  </p>
                </li>
                
                  <p className="nav-link text-dark ">
                    {FirstName} {LastName}
                  </p>
             
              </ul>
            </div>
            <div className="d-flex align-items-center pb-3">
              <span className="nav-link cursor-pointer " onClick={handleLogoutBtn}>
                <IoMdLogOut size={25} />
              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header

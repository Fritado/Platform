import React from 'react'
import { GrConnect } from 'react-icons/gr'

import CIcon from '@coreui/icons-react'
import { cilSpeedometer } from '@coreui/icons'

import { CNavItem, CNavTitle } from '@coreui/react'

const SA_nav = [
  {
    component: CNavItem,
    name: 'Admin Dashboard',
    to: '/admin-dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Integration',
  },
  {
    component: CNavItem,
    name: 'Prompt',
    to: '/prompts',
    icon: (
      <span className="pe-2">
        <GrConnect />
      </span>
    ),
  },
  {
    component: CNavTitle,
    name: 'Subscription',
  },
  {
    component: CNavItem,
    name: 'Pacakage manager',
    to: '/admin/package-manager',
    icon: (
      <span className="pe-2">
        <GrConnect />
      </span>
    ),
  },
  {
    component: CNavItem,
    name: 'User manager',
    to: '/admin/user-manager',
    icon: (
      <span className="pe-2">
        <GrConnect />
      </span>
    ),
  },
]

export default SA_nav

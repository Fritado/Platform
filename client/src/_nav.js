import React from 'react'
import { GrConnect, GrBlog } from 'react-icons/gr'
import { BsSendArrowUp } from 'react-icons/bs'
import CIcon from '@coreui/icons-react'
import {
  cilCursor,
  cilDescription,
  cilNotes,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { IoMdContacts } from 'react-icons/io'
import { IoHelpBuoyOutline } from 'react-icons/io5'
import { MdOutlineAttachEmail } from 'react-icons/md'
import { LiaFileCode } from 'react-icons/lia'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { FaSackDollar } from 'react-icons/fa6'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Integration',
  },
  {
    component:CNavItem,
    name: 'Connect',
    to: '/connect-overview',
    icon: (
      <span className="pe-2">
        <GrConnect />
      </span>
    ),
  },
  {
    component: CNavGroup,
    name: 'Onboarding',

    icon: (
      <span className="pe-2">
        <BsSendArrowUp />
      </span>
    ),
    items: [
      {
        component: CNavItem,
        name: 'Business Profile',
        to: '/business-profile',
      },
      {
        component: CNavItem,
        name: 'Competetors',
        to: '/competetor',
      },
      {
        component: CNavItem,
        name: 'Keywords',
        to: '/keywords',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Onsite',
    icon: (
      <span className="pe-2">
        <LiaFileCode />
      </span>
    ),
    items: [
      {
        component: CNavItem,
        name: 'Code Change',
        to: '/onsite-code',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Content Marketing',
    icon: (
      <span className="pe-2">
        <GrBlog />
      </span>
    ),
    items: [
      {
        component: CNavItem,
        name: 'Blog Automation',
        to: '/blog-automation',
      },
    ],
  },
  ////////////////////////////////////////////////////////////////////////////////////////////
  {
    component: CNavTitle,
    name: 'Marketing',
  },

  {
    component: CNavItem,
    name: 'Contact',
    to: '/fritado.com',
    icon: (
      <span className="pe-2 ">
        <IoMdContacts />
      </span>
    ),
  },
  {
    component: CNavItem,
    name: 'Email Automation',
    to: '/fritado.com',
    icon: (
      <span className="pe-2">
        <MdOutlineAttachEmail />
      </span>
    ),
  },
  {
    component: CNavItem,
    name: 'Billing & Plans',
    to: '/billing-and-plan',
    icon: (
      <span className="pe-2">
        <FaSackDollar />
      </span>
    ),
  },
  {
    component: CNavItem,
    name: 'Help Center',
    to: '/help-center-page',
    icon: (
      <span className="pe-2">
        <IoHelpBuoyOutline />
      </span>
    ),
  },
]

export default _nav

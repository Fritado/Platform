import React from 'react'
import { GrConnect, GrBlog } from 'react-icons/gr'
import { BsSendArrowUp } from 'react-icons/bs'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer } from '@coreui/icons'
import { IoMdContacts } from 'react-icons/io'
import { IoHelpBuoyOutline } from 'react-icons/io5'
import { MdOutlineAttachEmail } from 'react-icons/md'
import { LiaFileCode } from 'react-icons/lia'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { FaSackDollar } from 'react-icons/fa6'
import { CgProfile } from 'react-icons/cg';
import { IoMdSettings } from "react-icons/io";

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
    component: CNavItem,
    name: 'Connect',
    to: '/website-connect',
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
    name: 'Content Automation',
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
    to: '/contact',
    icon: (
      <span className="pe-2 ">
        <IoMdContacts />
      </span>
    ),
  },
  {
    component: CNavItem,
    name: 'Email Automation',
    to: '/email-automation',
    icon: (
      <span className="pe-2">
        <MdOutlineAttachEmail />
      </span>
    ),
  },

  ////////////////////////////////////////////////////////////////////////////////////////////
  {
    component: CNavTitle,
    name: 'Administration',
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
    name: 'Profile',
    to: '/profile',
    icon: (
      <span className="pe-2">
        <CgProfile />
      </span>
    ),
  },
  {
    component: CNavItem,
    name: 'Settings',
    to: '/settings',
    icon: (
      <span className="pe-2">
        <IoMdSettings />
      </span>
    ),
  },

  {
    component: CNavTitle,
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

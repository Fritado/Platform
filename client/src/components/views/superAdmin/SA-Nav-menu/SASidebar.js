import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { SASidebarNav } from './SASidebarNav'

import logo from '../../../../assets/images/logo2.png'

// sidebar nav config
import navItems from '../SA-Nav-menu/SA_nav'

const SASidebar = () => {
  const [sidebarShow, setSidebarShow] = useState(true)
  const dispatch = useDispatch()
  // const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  // const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      className="border-end"
      colorScheme="light"
      position="fixed"
      // unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => setSidebarShow(visible)}
    >
      <CSidebarHeader className="border-bottom justify-content-center">
        <CSidebarBrand to="/">
          <img src={logo} width={135} className="d-flex mx-auto justify-center" />
        </CSidebarBrand>
        <CCloseButton className="d-lg-none" dark onClick={() => setSidebarShow(false)} />
      </CSidebarHeader>
      <SASidebarNav items={navItems} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler onClick={() => setSidebarShow(!sidebarShow)} />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(SASidebar)

import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import { CContainer } from '@coreui/react'
import routes from '../../routes'

const AppContent = () => {
  return (
    <CContainer className="px-4" lg>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
        </Routes>
    
    </CContainer>
  )
}

export default React.memo(AppContent)

import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import { SAroutes } from '../../../../SAroutes'

const SAContent = () => {
  return (
    <CContainer className="px-4" lg>
      <Routes>
        {SAroutes.map((SAroute, idx) => {
          return (
            SAroute.element && (
              <Route
                key={idx}
                path={SAroute.path}
                exact={SAroute.exact}
                name={SAroute.name}
                element={<SAroute.element />}
              />
            )
          )
        })}
       
      </Routes>
    </CContainer>
  )
}

export default React.memo(SAContent)

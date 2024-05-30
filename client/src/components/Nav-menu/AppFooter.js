import React from 'react'
import { CFooter } from '@coreui/react'
import { Link } from 'react-router-dom'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        
        <span className="ms-1 px-2" style={{textDecoration:"none"}}>
          &copy; 2024 Copyright :
          <Link to="https://www.fritado.com" className=" text-dark" style={{textDecoration:"none"}}>
            <span className ="px-2">
             Fritado Technologies 
            </span>
          </Link>
          | All rights reserved
        </span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)

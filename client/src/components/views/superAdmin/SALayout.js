import React  from 'react'
import SASidebar from "../superAdmin/SA-Nav-menu/SASidebar";
import SAContent from "../superAdmin/SA-Nav-menu/SAContent";
import AppHeader from "../../Nav-menu/AppHeader"
import AppFooter from "../../Nav-menu/AppFooter";

const SALayout = () => {
 
  return (
    <div>
      
      <SASidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <SAContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default SALayout



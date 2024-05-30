import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = ({ tabsName }) => {
  const [selectedTab, setSelectedTab] = useState(tabsName[0].title)

  return (
    <div className="d-flex flex-column flex-md-row mx-2 py-2">
      {tabsName.map((ele) => (
        <div
          key={ele.id}
          className={`text-center px-3 pt-2 me-2 mb-2 mb-md-0 border ${selectedTab === ele.title ? 'selected' : 'bg-white'}`}
          onMouseEnter={() => setSelectedTab(ele.title)}
          onClick={() => setSelectedTab(ele.title)}
        >
          <Link
            to={ele.path}
            style={{
              textDecoration: 'none',
              color: selectedTab === ele.title ? 'black fw-semibold' : '',
            }}
          >
            <p>{ele.title}</p>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Header

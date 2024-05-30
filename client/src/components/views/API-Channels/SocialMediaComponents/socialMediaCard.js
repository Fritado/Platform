import React, { useState } from 'react'
import { FaFacebook, FaLinkedin } from 'react-icons/fa'
import { FaReddit, FaMedium, FaPlug } from 'react-icons/fa6'
import { MdCloudDownload } from 'react-icons/md'
import { Link } from 'react-router-dom'

const IconArray = [
  {
    id: 1,
    icon: <FaFacebook size={95} color="rgb(97 116 221)" />,
    elem1: (
      <Link to="/fb-setting">
        {' '}
        <FaPlug size={18} color="#0D8BF1" />{' '}
      </Link>
    ),
    elem2: (
      <Link to="">
        <MdCloudDownload size={20} color="ffc107" />
      </Link>
    ),
  },
  {
    id: 2,
    icon: <FaLinkedin size={95} color="rgb(44 122 185)" />,
    elem1: (
      <Link to="/linkedin-setting">
        {' '}
        <FaPlug size={18} color="#0D8BF1" />{' '}
      </Link>
    ),
    elem2: (
      <Link to="">
        <MdCloudDownload size={20} color="ffc107" />
      </Link>
    ),
  },
  {
    id: 3,
    icon: <FaReddit size={95} color="red" />,
    elem1: (
      <Link to="/reddit-setting">
        {' '}
        <FaPlug size={18} color="#0D8BF1" />{' '}
      </Link>
    ),
    elem2: (
      <Link to="">
        <MdCloudDownload size={20} color="ffc107" />
      </Link>
    ),
  },
  {
    id: 4,
    icon: <FaMedium size={95} />,
    elem1: (
      <Link to="/medium-setting">
        {' '}
        <FaPlug size={18} color="#0D8BF1" />{' '}
      </Link>
    ),
    elem2: (
      <Link to="">
        <MdCloudDownload size={20} color="ffc107" />
      </Link>
    ),
  },
]

const SocialMediaCard = () => {
  const [expandedIcon, setExpandedIcon] = useState(null)

  const handleIconClick = (id) => {
    if (expandedIcon === id) {
      setExpandedIcon(null)
    } else {
      setExpandedIcon(id)
    }
  }

  return (
    <div className="">
      <div className="d-flex flex-row mx-auto">
        {IconArray.map((item) => {
          return (
            <div key={item.id} className="p-4 mx-3 border border-light-subtle rounded bg-white">
              <div onClick={() => handleIconClick(item.id)}>
                <span>{item.icon}</span>
              </div>
              {expandedIcon === item.id && (
                <div className="d-flex my-3 justify-content-evenly">
                  <span className=" border border-info rounded-circle p-2">{item.elem1}</span>
                  <span className="border  border-warning rounded-circle p-2">{item.elem2}</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SocialMediaCard

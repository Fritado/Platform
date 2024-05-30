import React, { useState } from 'react';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ImMobile } from 'react-icons/im';
import { BsLaptop } from 'react-icons/bs';
import { setDomainName } from '../../../slice/PageSpeedSlice';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../common/Header';
import AuthFooter from '../common/AuthFooter';
import DesktopView from './DesktopView';
import MobileView from './MobileView';

const PageSpeedInsights = () => {
  const [activeTab, setActiveTab] = useState('desktop');
  const location = useLocation();
  const dispatch = useDispatch();
  const pageSpeedData = location.state?.pageSpeedData;
  const time = pageSpeedData.lighthouseResult.fetchTime;
  const domainName = pageSpeedData.id;
  dispatch(setDomainName(domainName));

  const domainNamedata = useSelector(setDomainName);
  const projectName = domainNamedata.payload.domain.domainName;

  const inputTime = new Date(time);
  const formattedTime = inputTime.toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="d-flex flex-column">
      <Header />

      <div className="container mt-4 pt-2" style={{ maxWidth: '960px' }}>
        <div className="row justify-content-center">
          <div className="col-12 col-md-auto">
            <h1 className="text-center">{projectName} :</h1>
          </div>
          <div className="col-12 col-md-auto">
            <h1 className="text-center">{formattedTime}</h1>
          </div>
        </div>
        <div className="row justify-content-center my-2">
          <div className="col-auto">
            {/* <div
              onClick={() => handleTabChange('mobile')}
              className={`text-center cursor-pointer ${
                activeTab === 'mobile' ? 'active' : ''
              }`}
            >
              <ImMobile size={25} />
              <span className="d-block">Mobile</span>
            </div> */}
          </div>
          <div className="col-auto">
            <div
              onClick={() => handleTabChange('desktop')}
              className={`text-center cursor-pointer ${
                activeTab === 'desktop' ? 'active' : ''
              }`}
            >
              <BsLaptop size={25} />
              <span className="d-block">Desktop</span>
            </div>
          </div>
        </div>
        <div className="border rounded bg-white text-dark mb-3">
        <DesktopView />
          {/* {activeTab === 'mobile' ? <MobileView /> : <DesktopView />} */}
        </div>
      </div>

      <div className="container" style={{ maxWidth: '960px' }}>
        <div className="row justify-content-center">
          <div className="col-auto">
            <button className="btn btn-primary border rounded py-3 px-md-5 px-4 my-4 font-weight-bold">
              <Link to="/portal-walk-through" className="text-white text-decoration-none d-flex align-items-center">
                GO NEXT
                <MdKeyboardDoubleArrowRight size={22} className="ml-2" />
              </Link>
            </button>
          </div>
        </div>
      </div>

      <AuthFooter />
    </div>
  );
};

export default PageSpeedInsights;

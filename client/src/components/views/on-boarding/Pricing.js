import React, {useState} from 'react'
import { MdKeyboardDoubleArrowRight } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { IoMdRadioButtonOn, IoMdRadioButtonOff, IoMdArrowForward } from 'react-icons/io'
import { TiTick } from 'react-icons/ti'
import { LuBadgeHelp } from 'react-icons/lu'
import AuthFooter from '../common/AuthFooter'
import Header from '../common/Header'

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  return (
    <div className="d-flex flex-column">
      <Header />
      <div className="container my-4" style={{ maxWidth: '768px' }}>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="bg-white p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-semibold m-0">Get a 1-Week free trial</h4>
                <Link to="/help-center-page" target="_blank">
                  <LuBadgeHelp size={25} />
                </Link>
              </div>
              <div className="border-top py-3">
                <div className="text-center">
                  <h4 className="fw-medium">Reach more customers</h4>
                  <p className="pt-3">
                    With Fritado, you can reach more customers and grow your business week over week
                  </p>
                </div>
                <div className="d-flex flex-column justify-content-between py-2">
                  <div className="row mb-3">
                    <div className="col">
                      <button  className={`btn btn-primary btn-lg btn-block ${selectedPlan === 'monthly' ? 'active' : ''}`}
                        onClick={() => setSelectedPlan('monthly')}>
                        <IoMdRadioButtonOn size={20} /> Monthly
                      </button>
                    </div>
                    <div className="col">
                      <button  className={`btn btn-primary btn-lg btn-block ${selectedPlan === 'annual' ? 'active' : ''}`}
                        onClick={() => setSelectedPlan('annual')}
                       style={{backgroundColor:"rgba(47, 130, 162, 0.5)"
                       }}
                        >
                        <IoMdRadioButtonOff size={20} /> Annual
                      </button>
                    </div>
                  </div>
                  <ul className="text-dark">
                    <li className="mb-2">
                      <TiTick size={25} /> 1-week free trial
                    </li>
                    <li className="mb-2">
                      <TiTick size={25} /> Weekly automated SEO updates to reach customers
                    </li>
                    <li className="mb-2">
                      <TiTick size={25} /> Grow your traffic with automated organic SEO
                    </li>
                    <li className="mb-2">
                      <TiTick size={25} /> Track your growth with custom dashboard
                    </li>
                  </ul>
                </div>
                <div className="d-flex  justify-content-between  align-items-center mt-4">
                  <div className='me-3'>
                    <strong className="price">$49.99</strong> /mo (billed annually)
                  </div>
                  <div className="col">
                    <Link to="/payment" className="btn btn-primary btn-lg btn-block">
                      Start free trial <IoMdArrowForward size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AuthFooter />
    </div>
  )
}

export default Pricing

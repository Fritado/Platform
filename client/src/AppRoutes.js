import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Spinner from './components/views/common/Spinner'
const Login = lazy(() => import('./components/views/pages/Login'))
const Register = lazy(() => import('./components/views/pages/Register'))
const VerifyOtp = lazy(()=> import ('./components/views/pages/VerifyOtp'));
const ForgotPassword = lazy(() => import('./components/views/pages/ForgotPassword'))
const NewPassword = lazy(() => import('./components/views/pages/NewPassword'))
const BlogDetails = lazy(
  () => import('./components/views/ContentMarketing/BlogDetails/BlogDetails'),
)
const BusinessInfo = lazy(() => import('./components/views/on-boarding-menu/BusinessInfo'))
const Prompts = lazy(() => import('./components/views/superAdmin/Prompts/Prompts'))
const SALayout = lazy(() => import('./components/views/superAdmin/SALayout'))
const HelpCenterPage = lazy(() => import('./components/views/HelpCenter/HelpCenterPage'))
const ConnectWebsite = lazy(() => import('./components/views/on-boarding/ConnectWebsite'))
const AdminDashboard = lazy(() => import('./components/views/superAdmin/SADasboard/AdminDashboard'))
const DomainPage = lazy(() => import('./components/views/on-boarding/DomainPage'))
const PortalWalkThrough = lazy(() => import('./components/views/PortalWalkThrough'))
const PageSpeedInsights = lazy(() => import('./components/views/on-boarding/PageSpeedInsights'))
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'))

// const Pricing = lazy(() => import('./components/views/on-boarding/Pricing'))
// const SelectPlan = lazy(() => import('./components/views/on-boarding/SelectPlan'))

const AppRoutes = () => {
  let userData = null
  const userDataString = localStorage.getItem('user')
  // userData = userDataString ? JSON.parse(userDataString) : null
   if (userDataString) {
    try {
      userData = JSON.parse(userDataString);
    } catch (e) {
      console.error('Error parsing user data from localStorage:', e);
    }
  }
  const userRole = userData ? userData.role : 'user'

  return (
    <Suspense
      fallback={
        <div className="pt-3 mx-auto position-fixed top-50 start-50 translate-middle">
          <Spinner />
        </div>
      }
    >
      <Routes>
        {userRole === 'superAdmin' ? (
          <Route path="*" element={<SALayout />} />
        ) : (
          <Route path="*" element={<DefaultLayout />} />
        )}
        <Route path="*" element={<DefaultLayout />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<NewPassword />} />
        <Route path="/blog-details/:topic" element={<BlogDetails />} />
        <Route path="/help-center-page" element={<HelpCenterPage />} />
        <Route path="/connect-website" element={<ConnectWebsite />} />
        <Route path="/super-admin-dashboard" element={<AdminDashboard />} />
        <Route path="/business-domain" element={<DomainPage />} />
        {/* <Route path="/pricing" element={<Pricing />} />
        <Route path="/payment" element={<SelectPlan />} /> */}
        <Route path="/portal-walk-through" element={<PortalWalkThrough />} />
        <Route path="/pagespeed-insights" element={<PageSpeedInsights />} />
        <Route path="/business-info" element={<BusinessInfo />} />
        <Route path="/prompt" element={<Prompts />} />
      </Routes>
    </Suspense>
  )
}

export default React.memo(AppRoutes)

import React, { Suspense, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { lazy } from 'react'
import ProtectedRoute from './AuthRoute/ProtectedRoute'
import Login from './components/views/pages/Login'
import Register from './components/views/pages/Register'
import Spinner from './components/views/common/Spinner'
const ForgotPassword = lazy(() => import('./components/views/pages/ForgotPassword'))
const NewPassword = lazy(() => import('./components/views/pages/NewPassword'))
const BlogDetails = lazy(
  () => import('./components/views/ContentMarketing/BlogDetails/BlogDetails'),
)
import BusinessInfo from './components/views/on-boarding-menu/BusinessInfo'
import Prompts from './components/views/superAdmin/Prompts/Prompts'
import SALayout from './components/views/superAdmin/SALayout'
const HelpCenterPage = lazy(() => import('./components/views/HelpCenter/HelpCenterPage'))
const ConnectWebsite = lazy(() => import('./components/views/on-boarding/ConnectWebsite'))
const AdminDashboard = lazy(() => import('./components/views/superAdmin/SADasboard/AdminDashboard'))
const DomainPage = lazy(() => import('./components/views/on-boarding/DomainPage'))
const Pricing = lazy(() => import('./components/views/on-boarding/Pricing'))
const SelectPlan = lazy(() => import('./components/views/on-boarding/SelectPlan'))
const PortalWalkThrough = lazy(() => import('./components/views/PortalWalkThrough'))
const PageSpeedInsights = lazy(() => import('./components/views/on-boarding/PageSpeedInsights'))
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'))

const AppRoutes = () => {
  const userDataString = localStorage.getItem('user')
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const userRole = userData ? userData.role : 'user';
  //  console.log(userRole , "role")

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

export default AppRoutes

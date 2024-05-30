import React from 'react'
import { lazy } from 'react'
import BillingAndPlans from './components/views/BillingsAndPlans/BillingAndPlans'
import ConnectOverview from './components/views/API-Channels/ConnectOverview'
import SocialMediaForm from './components/views/API-Channels/SocialMediaComponents/SocialMediaForm'
import SocialMediaAddApp from './components/views/API-Channels/SocialMediaComponents/SocialMediaAddApp'
import Facebook from './components/views/API-Channels/SocialMediaPages/Fb/Facebook'
import FbAppSetting from './components/views/API-Channels/SocialMediaPages/Fb/FbAppSetting'
import Linkedin from './components/views/API-Channels/SocialMediaPages/linkedin/Linkedin'
import LinkedinAppSetting from './components/views/API-Channels/SocialMediaPages/linkedin/LinkedinAppSetting'
import Medium from './components/views/API-Channels/SocialMediaPages/medium/Medium'
import MediumAppSetting from './components/views/API-Channels/SocialMediaPages/medium/MediumAppSetting'
import Reddit from './components/views/API-Channels/SocialMediaPages/Reddit/Reddit'
import RedditAppSetting from './components/views/API-Channels/SocialMediaPages/Reddit/RedditAppSetting'
import ConnectWeb from "./components/views/API-Channels/ConnectWeb"
import BlogSettings from './components/views/ContentMarketing/BlogSettings'
import ConnectWebsiteOther from "./components/views/API-Channels/connect-web/ConnectWebsiteOther"
import ConnectWebsite from './components/views/API-Channels/connect-web/ConnectWebsite'
import ConnectwebTable from './components/views/API-Channels/connect-web/ConnectwebTable'
import ConnectAddWebsite from './components/views/API-Channels/connect-web/ConnectAddWebsite'

const Dashboard = lazy(() => import('./components/views/dashboard/Dashboard'))
const SocialMedia = lazy(() => import('./components/views/API-Channels/SocialMedia'))
const BusinessProfile = lazy(() => import('./components/views/on-boarding-menu/BusinessProfile'))
const keywords = lazy(() => import('./components/views/on-boarding-menu/Keywords'))
const Competetors = lazy(() => import('./components/views/on-boarding-menu/Competetors'))
const AddKeyword = lazy(() => import('./components/views/on-boarding-menu/AddKeyword'))
const BillingPlans = lazy(() => import('./components/views/BillingsAndPlans/BillingPlans'))
const OnSiteOverview = lazy(() => import('./components/views/onSite/OnSiteOverview'))
const BlogOverView = lazy(() => import('./components/views/ContentMarketing/BlogOverView'))
const BlogHistory = lazy(() => import('./components/views/ContentMarketing/BlogHistory'))
const UpcomingBlogs = lazy(() => import('./components/views/ContentMarketing/UpcomingBlogs'))
const Profile = lazy(() => import('./components/views/Profile/Profile'));



const routes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/connect-social-medias', name: 'SocialMedia', element: SocialMedia },
  { path: '/connect-overview', name: 'ConnectOverview', element: ConnectOverview },
  { path: '/connect-web', name: 'ConnectWeb', element: ConnectWeb },
  { path: '/social-media-add-app-setting', name: 'SocialMediaAddApp', element: SocialMediaAddApp },
  { path: '/fb-setting', name: 'Facebook', element: Facebook },
  { path: '/fb-app-setting', name: FbAppSetting, element: FbAppSetting },
  { path: '/linkedin-app-setting', name: LinkedinAppSetting, element: LinkedinAppSetting },
  { path: '/linkedin-setting', name: 'Linkedin', element: Linkedin },
  { path: '/medium-setting', name: 'Medium', element: Medium },
  { path: '/medium-app-setting', name:' MediumAppSetting', element: MediumAppSetting },
  { path: '/reddit-setting', name: 'Reddit', element: Reddit },
  { path: '/reddit-app-setting', name: RedditAppSetting, element: RedditAppSetting },
  { path: '/social-media-form', name: 'SocialMediaForm', element: SocialMediaForm },
  { path: '/website-connect', name: 'ConnectWebsite', element: ConnectWebsite },
  { path: '/connect-web', name: 'ConnectWeb', element: ConnectWeb },
  //{ path: '/connect-web-others', name: 'ConnectWebsiteOther', element:ConnectWebsiteOther },
  { path: '/add-website', name: 'ConnectAddWebsite', element:ConnectAddWebsite},

  { path: '/business-profile', name: 'BusinessProfile', element: BusinessProfile },
  { path: '/keywords', name: 'keywords', element: keywords },
  { path: '/competetor', name: 'Competetors', element: Competetors },
  { path: '/add-keyword', name: 'AddKeyword', element: AddKeyword },
  { path: '/onsite-code', name: 'OnSiteOverview', element: OnSiteOverview },
  { path: '/blog-automation', name: 'BlogOverView', element: BlogOverView },
  { path: '/blog-history', name: 'BlogHistory', element: BlogHistory },
  { path: '/upcoming-blogs', name: 'UpcomingBlogs', element: UpcomingBlogs },
  { path: '/blog-settings', name: 'BlogSettings', element: BlogSettings},
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/billing-plan', name: 'BillingPlans', element: BillingPlans },
  { path: '/billing-and-plan', name: 'BillingAndPlans', element: BillingAndPlans },
]

export default routes

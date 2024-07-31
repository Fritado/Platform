import React, { lazy } from 'react'
import analyticsInfo from './components/views/API-Channels/SocialMediaPages/googleAnalytics/analyticsInfo'
import Settings from './components/views/Settings/Settings'

const BillingAndPlans = lazy(() => import('./components/views/BillingsAndPlans/BillingAndPlans'))
const ConnectOverview = lazy(() => import('./components/views/API-Channels/ConnectOverview'))
const SocialMediaForm = lazy(
  () => import('./components/views/API-Channels/SocialMediaComponents/SocialMediaForm'),
)
const SocialMediaAddApp = lazy(
  () => import('./components/views/API-Channels/SocialMediaComponents/SocialMediaAddApp'),
)

const Facebook = lazy(() => import('./components/views/API-Channels/SocialMediaPages/Fb/Facebook'))
const FbAppSetting = lazy(
  () => import('./components/views/API-Channels/SocialMediaPages/Fb/FbAppSetting'),
)
const Linkedin = lazy(
  () => import('./components/views/API-Channels/SocialMediaPages/linkedin/Linkedin'),
)
const LinkedinAppSetting = lazy(
  () => import('./components/views/API-Channels/SocialMediaPages/linkedin/LinkedinAppSetting'),
)

const Medium = lazy(() => import('./components/views/API-Channels/SocialMediaPages/medium/Medium'))
const MediumAppSetting = lazy(
  () => import('./components/views/API-Channels/SocialMediaPages/medium/MediumAppSetting'),
)
const Reddit = lazy(() => import('./components/views/API-Channels/SocialMediaPages/Reddit/Reddit'))
const RedditAppSetting = lazy(
  () => import('./components/views/API-Channels/SocialMediaPages/Reddit/RedditAppSetting'),
)
const ConnectWeb = lazy(() => import('./components/views/API-Channels/ConnectWeb'))

const BlogSettings = lazy(() => import('./components/views/Settings/BlogSettings'))
const ConnectWebsiteOther = lazy(
  () => import('./components/views/API-Channels/connect-web/ConnectWebsiteOther'),
)
const ConnectWebsite = lazy(
  () => import('./components/views/API-Channels/connect-web/ConnectWebsite'),
)
const ConnectwebTable = lazy(
  () => import('./components/views/API-Channels/connect-web/ConnectwebTable'),
)
const ConnectAddWebsite = lazy(
  () => import('./components/views/API-Channels/connect-web/ConnectAddWebsite'),
)
const Dashboard = lazy(() => import('./components/views/dashboard/Dashboard'))
const SocialMedia = lazy(() => import('./components/views/API-Channels/SocialMedia'))
const BusinessProfile = lazy(() => import('./components/views/on-boarding-menu/BusinessProfile'))
const keywords = lazy(() => import('./components/views/on-boarding-menu/Keywords'))
const AddKeyword = lazy(() => import('./components/views/on-boarding-menu/AddKeyword'))
const BillingPlans = lazy(() => import('./components/views/BillingsAndPlans/BillingPlans'))
const OnSiteOverview = lazy(() => import('./components/views/onSite/OnSiteOverview'))
const BlogOverView = lazy(() => import('./components/views/ContentMarketing/BlogOverView'))

const UpcomingBlogs = lazy(() => import('./components/views/ContentMarketing/UpcomingBlogs'))
const Profile = lazy(() => import('./components/views/Profile/Profile'))
const PhpIntegration = lazy(
  () => import('./components/views/API-Channels/connect-web/PHP/PhpIntegration'),
)
const WordPressIntegration = lazy(
  () => import('./components/views/API-Channels/connect-web/WordPress/WordPressIntegration'),
)
const Contact = lazy(()=> import ('./components/views/Contact/Contact'));
const EmailAutomation = lazy(()=> import ('./components/views/Email-automation/EmailAutomation'))



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
  { path: '/medium-app-setting', name: ' MediumAppSetting', element: MediumAppSetting },
  { path: '/reddit-setting', name: 'Reddit', element: Reddit },
  { path: '/reddit-app-setting', name: RedditAppSetting, element: RedditAppSetting },
  { path: '/social-media-form', name: 'SocialMediaForm', element: SocialMediaForm },
  { path: '/website-connect', name: 'ConnectWebsite', element: ConnectWebsite },
  { path: '/connect-web', name: 'ConnectWeb', element: ConnectWeb },
  // Website integration route
  { path: '/php-integration', name: 'PhpIntegration', element: PhpIntegration },
  { path: '/wordpress-integration', name: 'WordPressIntegration ', element: WordPressIntegration  },

  //******************google analytics -> analytics Info********************* */
  { path: '/analyticsInfo', name: 'analyticsInfo', element: analyticsInfo},

  ///////////////////////////////////
  { path: '/add-website', name: 'ConnectAddWebsite', element: ConnectAddWebsite },


  //Onboarding
  { path: '/business-profile', name: 'BusinessProfile', element: BusinessProfile },
  { path: '/keywords', name: 'keywords', element: keywords },
  { path: '/add-keyword', name: 'AddKeyword', element: AddKeyword },

  { path: '/onsite-code', name: 'OnSiteOverview', element: OnSiteOverview },

  //Blogs
  { path: '/blog-automation', name: 'BlogOverView', element: BlogOverView },
  { path: '/upcoming-blogs', name: 'UpcomingBlogs', element: UpcomingBlogs },
  { path: '/blog-settings', name: 'BlogSettings', element: BlogSettings },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/billing-plan', name: 'BillingPlans', element: BillingPlans },
  { path: '/billing-and-plan', name: 'BillingAndPlans', element: BillingAndPlans },

  //contact
  { path: '/contact', name: 'Contact', element: Contact },
  { path: '/email-automation', name: 'EmailAutomation', element: EmailAutomation },

  //settings
  { path: '/settings', name: 'Settings', element: Settings },
]

export default routes

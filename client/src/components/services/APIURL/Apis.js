export const API_BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:4000/api'

export const AUTH_API_ROUTES = {
  LOGIN: API_BASE_URL + '/auth/login',
  SIGNUP: API_BASE_URL + '/auth/signup',
  FORGOT_PASSWORD: API_BASE_URL + '/auth/reset-password-token-link',
  NEW_PASSWORD: API_BASE_URL + '/auth/reset-password',
  SAVE_PROFILE: API_BASE_URL + '/auth/update-user-profile',
  FETCH_PROFILE: API_BASE_URL + '/auth/fetch-user-details',
}

export const DOMAIN_API_ROUTES = {
  CHECK_PJ_NAME: API_BASE_URL + '/domainName/check-ProjectUrl',
  SAVE_PJ_NAME: API_BASE_URL + '/domainName/projectUrl',
  GET_PJ_NAME: API_BASE_URL + '/domainName/fetch-projectUrl',
}

export const PORTAL_API_ROUTES = {
  GET_PJ_NAME: API_BASE_URL + '/domainName/fetch-projectUrl',
  WEBSITE_SCRAPE: API_BASE_URL + '/scrape/business-profile-generator',
  SAVE_BUSINESS: API_BASE_URL + '/businessProfile/create-businessProfile',
  SAVE_PRODUCT_SERVICE: API_BASE_URL + '/businessProfile/create-product&services',
  SAVE_LOCATION: API_BASE_URL + '/businessProfile/create-location',
  SAVE_KEYWORD: API_BASE_URL + '/businessProfile/save-keywords',
}
export const BLOG_API_ROUTES = {
  GET_BUSINESS_PROFILE: API_BASE_URL + '/businessProfile/get-businessProfile',
  SAVE_BLOG_TOPIC: API_BASE_URL + '/openAi/blog-topic-generator',
  FETCH_BLOG_TOPICS: API_BASE_URL + '/openAi/fetch-blog-topics',
  SAVE_BLOGS: API_BASE_URL + '/openAi/save-blogs',
  CHECK_BLOGS: API_BASE_URL + '/openAi/check-blogs',
  FETCH_BLOG_BY_TOPIC: API_BASE_URL + '/openAi/fetch-eachBlogs',
  UPDATE_BLOG_DETAILS: API_BASE_URL + '/openAi/update-each-blog-desc',
  APPROVE_BLOG: API_BASE_URL + '/openAi/blogs/:blogId/approve',
  GET_BLOG_STATUS: API_BASE_URL + '/openAi/blogs/status',
  RECENT_BLOG: API_BASE_URL + '/openAi/recent-blogs/publish',
  SCHEDULE_BLOG_POST_TIME : API_BASE_URL + "/openAi/schedule-blog-time",
  GET_SCHEDULED_TIME_BY_USER : API_BASE_URL +  '/openAi/fetch-user-scheduled-time',
}

export const BUSINESS_PROFILE_ROUTES = {
  UPDATE_BP: API_BASE_URL + '/businessProfile/update-businessProfile',
  SAVE_BP: API_BASE_URL + '/businessProfile/create-businessProfile',
  CREATE_LOCATION: API_BASE_URL + '/businessProfile/create-location',
  CREATE_PRODUCT_AND_SERVICE: API_BASE_URL + '/businessProfile/create-product&services',
  UPDATE_SINGLE_PRODUCT_AND_SERVICE:
    API_BASE_URL + '/businessProfile/update-single-product-service',
  DELETE_PRODUCT_AND_SERVICE: API_BASE_URL + '/businessProfile/delete-product-service',
  GET_ABOUT_BP: API_BASE_URL + '/businessProfile/get-businessProfile',
  GET_PRODUCT_AND_SERVICE: API_BASE_URL + '/businessProfile/get-product-service',
  SAVE_BUSINESS_INFO: API_BASE_URL + '/businessProfile/save-businessinfo',
  UPDATE_BUSINESS_INFO: API_BASE_URL + '/businessProfile/update-businessinfo',
}

export const BILLING_PLANS_PAYMENT = {
  ORDER_CHECKOUT: API_BASE_URL + '/payment/checkout',
  PAYMENT_VERIFY: API_BASE_URL + '/payment/payment-verification',
  GET_PAYMENT_DETAILS : API_BASE_URL + '/payment/fetching-payment-details' ,
  TRIAL_DATE: API_BASE_URL + '/payment/trial-date',
  GET_TRIAL_DATE: API_BASE_URL + '/payment/getting-trial-date',
  GET_RAZORPAY_API_KEY :  API_BASE_URL + '/payment/get-payment-key'
}


export const PROMPT_API = {
  SAVE_PROMPTS: API_BASE_URL +  '/prompts/save-prompt-details',
  GET_PROMPTS : API_BASE_URL + '/prompts/fetch-prompt-details',
}
export const USER_MANAGER = {
FETCH_USER_INFO : API_BASE_URL + '/auth/fetch-all-users-details'
}

export const ADMIN_PACKAGE_MANAGER = {
  CREATE_PACKAGE : API_BASE_URL + '/super-admin/package/create-package',
  UPDATE_PACKAGE : API_BASE_URL + '/super-admin/package/update-package',
  GETALL_PACKAGE : API_BASE_URL + '/super-admin/package/getall-Packages',
  DELETE_PACKAGE : API_BASE_URL + '/super-admin/package/delete-package',
}

export const CONNECT_WEBSITE = {
  SAVE_WEBSITE_TYPE:  API_BASE_URL + '/connect/save-website-type',
  GET_WEBSITE_INFO : API_BASE_URL +  '/connect/fetch-website-details',
  DELETE_WEBSITE :  API_BASE_URL + ''
}
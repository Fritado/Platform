export const API_BASE_URL = process.env.REACT_APP_BASE_URL || 'https://server.fritado.com'

export const AUTH_API_ROUTES = {
  LOGIN: API_BASE_URL + '/api/auth/login',
  SIGNUP: API_BASE_URL + '/api/auth/signup',
  SEND_OTP: API_BASE_URL + '/api/auth/send-otp',
  FORGOT_PASSWORD: API_BASE_URL + '/api/auth/reset-password-token-link',
  FORGOT_PASSWORD: API_BASE_URL + '/api/auth/reset-password-token-link',
  NEW_PASSWORD: API_BASE_URL + '/api/auth/reset-password',
  SAVE_PROFILE: API_BASE_URL + '/api/auth/update-user-profile',
  FETCH_PROFILE: API_BASE_URL + '/api/auth/fetch-user-details',
}

export const DOMAIN_API_ROUTES = {
  CHECK_PJ_NAME: API_BASE_URL + '/api/domainName/check-ProjectUrl',
  SAVE_PJ_NAME: API_BASE_URL + '/api/domainName/projectUrl',
  GET_PJ_NAME: API_BASE_URL + '/api/domainName/fetch-projectUrl',
}

export const PORTAL_API_ROUTES = {
  GET_PJ_NAME: API_BASE_URL + '/api/domainName/fetch-projectUrl',
  WEBSITE_SCRAPE: API_BASE_URL + '/api/scrape/business-profile-generator',
  SAVE_BUSINESS: API_BASE_URL + '/api/businessProfile/create-businessProfile',
  SAVE_PRODUCT_SERVICE: API_BASE_URL + '/api/businessProfile/create-product&services',
  SAVE_LOCATION: API_BASE_URL + '/api/businessProfile/create-location',
  SAVE_KEYWORD: API_BASE_URL + '/api/businessProfile/save-keywords',
}
export const BLOG_API_ROUTES = {
  GET_BUSINESS_PROFILE: API_BASE_URL + '/api/businessProfile/get-businessProfile',
  SAVE_BLOG_TOPIC: API_BASE_URL + '/api/openAi/blog-topic-generator',
  FETCH_BLOG_TOPICS: API_BASE_URL + '/api/openAi/fetch-blog-topics',
  SAVE_BLOGS: API_BASE_URL + '/api/openAi/save-blogs',
  CHECK_BLOGS: API_BASE_URL + '/api/openAi/check-blogs',
  FETCH_BLOG_BY_TOPIC: API_BASE_URL + '/api/openAi/fetch-eachBlogs',
  UPDATE_BLOG_DETAILS: API_BASE_URL + '/api/openAi/update-each-blog-desc',
  APPROVE_BLOG: API_BASE_URL + '/api/openAi/blogs/:blogId/approve',
  GET_BLOG_STATUS: API_BASE_URL + '/api/openAi/blogs/status',
  RECENT_BLOG: API_BASE_URL + '/api/openAi/recent-blogs/publish',
  SCHEDULE_BLOG_POST_TIME : API_BASE_URL + "/api/openAi/schedule-blog-time",
  GET_SCHEDULED_TIME_BY_USER : API_BASE_URL +  '/api/openAi/fetch-user-scheduled-time',
}

export const BUSINESS_PROFILE_ROUTES = {
  UPDATE_BP: API_BASE_URL + '/api/businessProfile/update-businessProfile',
  SAVE_BP: API_BASE_URL + '/api/businessProfile/create-businessProfile',
  CREATE_LOCATION: API_BASE_URL + '/api/businessProfile/create-location',
  CREATE_PRODUCT_AND_SERVICE: API_BASE_URL + '/api/businessProfile/create-product&services',
  UPDATE_SINGLE_PRODUCT_AND_SERVICE:
    API_BASE_URL + '/api/businessProfile/update-single-product-service',
  DELETE_PRODUCT_AND_SERVICE: API_BASE_URL + '/api/businessProfile/delete-product-service',
  GET_ABOUT_BP: API_BASE_URL + '/api/businessProfile/get-businessProfile',
  GET_PRODUCT_AND_SERVICE: API_BASE_URL + '/api/businessProfile/get-product-service',
  SAVE_BUSINESS_INFO: API_BASE_URL + '/api/businessProfile/save-businessinfo',
  UPDATE_BUSINESS_INFO: API_BASE_URL + '/api/businessProfile/update-businessinfo',
  GET_LOCATION : API_BASE_URL + '/api/businessProfile/get-location',
  GET_KEYWORD : API_BASE_URL + '/api/businessProfile/get-keywords',
}

export const BILLING_PLANS_PAYMENT = {
  ORDER_CHECKOUT: API_BASE_URL + '/api/payment/checkout',
  PAYMENT_VERIFY: API_BASE_URL + '/api/payment/payment-verification',
  GET_PAYMENT_DETAILS : API_BASE_URL + '/api/payment/fetching-payment-details' ,
  TRIAL_DATE: API_BASE_URL + '/api/payment/trial-date',
  GET_TRIAL_DATE: API_BASE_URL + '/api/payment/getting-trial-date',
  GET_RAZORPAY_API_KEY :  API_BASE_URL + '/api/payment/get-payment-key'
}


export const PROMPT_API = {
  SAVE_PROMPTS: API_BASE_URL +  '/api/prompts/save-prompt-details',
  GET_PROMPTS : API_BASE_URL + '/api/prompts/fetch-prompt-details',
}
export const USER_MANAGER = {
FETCH_USER_INFO : API_BASE_URL + '/api/auth/fetch-all-users-details',
DELETE_USER_DATA : API_BASE_URL + '/api/super-admin/user-package/delete-user'
}

export const ADMIN_PACKAGE_MANAGER = {
  CREATE_PACKAGE : API_BASE_URL + '/api/super-admin/package/create-package',
  UPDATE_PACKAGE : API_BASE_URL + '/api/super-admin/package/update-package',
  GETALL_PACKAGE : API_BASE_URL + '/api/super-admin/package/getall-Packages',
  DELETE_PACKAGE : API_BASE_URL + '/api/super-admin/package/delete-package',
}

export const CONNECT_WEBSITE = {
  SAVE_WEBSITE_TYPE:  API_BASE_URL + '/api/connect/save-website-type',
  GET_WEBSITE_INFO : API_BASE_URL +  '/api/connect/fetch-website-details',
  DELETE_WEBSITE :  API_BASE_URL + ''
}
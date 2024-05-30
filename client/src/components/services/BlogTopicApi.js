import axios from 'axios'
import { API_BASE_URL, BLOG_API_ROUTES } from '../services/APIURL/Apis'
import { fetchPromptDetails } from '../services/PromptService/PromptService'

export const fetchingAboutBusiness = async (e) => {
  const fetchingURL = `${BLOG_API_ROUTES.GET_BUSINESS_PROFILE}`
  //console.log("fetchingURL" ,fetchingURL);
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not found')
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await axios.get(fetchingURL, config)
    const { data } = response.data
    return data.aboutBusiness
    //console.log("About Business Response", data.aboutBusiness);
  } catch (error) {
    console.log('Error while fetching About Business content from database', error)
    throw error
  }
}

export const fetchOpenAITopics = async (industryInfo) => {
  const promptDetailsResponse = await fetchPromptDetails()
  const promptDetails = promptDetailsResponse[0]
  const openAISecretKey = process.env.OPENAI_SECRET_KEY
  // console.log('openAISecretKey', openAISecretKey)

  const instruction = `${promptDetails.BlogTopic}`

  const prompt = `${instruction} Company Information: ${industryInfo}`

  const data = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.5,
    max_tokens: 2500,
    top_p: 1.0,
    frequency_penalty: 0.52,
    presence_penalty: 0.5,
    stop: ['11.'],
  }

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openAISecretKey}`,
      },
    })

    const responseData = response.data
    const generatedTopics = responseData.choices[0].message.content.split('\n')
    return generatedTopics
  } catch (error) {
    throw new Error('Error while fetching topics from OpenAI')
  }
}

export const saveBlogTopic = async (topics) => {
  const blogTopicUrl = `${BLOG_API_ROUTES.SAVE_BLOG_TOPIC}`
  // console.log('blogTopicUrl', blogTopicUrl)
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not found')
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const requestBody = {
      apiResponse: topics,
    }
    const response = await axios.post(blogTopicUrl, requestBody, config)
    //console.log('Saved', response)
  } catch (error) {
    console.log('Error while Saving Blog Topics content in database', error)
    throw error
  }
}

export const gettingBlogTopics = async () => {
  const getUrl = `${BLOG_API_ROUTES.FETCH_BLOG_TOPICS}`

  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not found')
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const blogTopicResponse = await axios.get(getUrl, config)
    const resBgTpc = blogTopicResponse.data.data.topics
    // console.log("blogTopicResponse" , blogTopicResponse.data.data.topics);
    return resBgTpc
  } catch (error) {
    console.log('Error while fetching Blog Topics data', error)
  }
}

export const BlogGenerate = async (topic) => {
  const promptDetailsResponse = await fetchPromptDetails()
  const promptDetails = promptDetailsResponse[0]

  const openAISecretKey = process.env.OPENAI_SECRET_KEY
  // console.log("openAISecretKey", openAISecretKey)

  const prompt = `${promptDetails.BlogDescription} - '${topic}'`
  console.log(prompt, 'Prompt blog details')

  const data = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.5,
    max_tokens: 2500,
    top_p: 1.0,
    frequency_penalty: 0.52,
    presence_penalty: 0.5,
    stop: ['11.'],
  }
  const url = 'https://api.openai.com/v1/chat/completions'
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openAISecretKey}`,
      },
    })
    //console.log(response, "response");
    const blogData = response.data.choices[0].message.content
    //console.log(response.data.choices[0].message.content , "content");
    return blogData
  } catch (error) {
    console.error('Error:', error)
  }
}

//save blog description with its topic

export const saveAllBlogs = async (topic, blogDescription) => {
  const saveBlogUrl = `${BLOG_API_ROUTES.SAVE_BLOGS}`

  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not found')
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const requestBody = {
      topic: topic,
      blogDescription: blogDescription,
    }

    const AllBlogs = await axios.post(saveBlogUrl, requestBody, config)
    console.log('All Blogs', AllBlogs)
  } catch (error) {
    console.log('Error while Saving Blog Details in database', error)
    throw error
  }
}

export const checkBlogAvailability = async () => {
  const checkUrl = `${BLOG_API_ROUTES.CHECK_BLOGS}`
  console.log('checkUrl', checkUrl)
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not found')
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.get(checkUrl, config)

    console.log('response', response)
    const missingTopics = response.data.missingTopics
    console.log('misingTopics', missingTopics)
    return missingTopics
  } catch (error) {
    console.log('Error while checking blog availability:', error.message)
  }
}

export const fetchBlogsByTopic = async (topic) => {
  const fetchBlogsUrl = `${BLOG_API_ROUTES.FETCH_BLOG_BY_TOPIC}/${encodeURIComponent(topic)}`

  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not found')
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const blogDetailsResponse = await axios.get(fetchBlogsUrl, config)
    //console.log('blogDetailsResponse', blogDetailsResponse.data)
    return blogDetailsResponse.data
  } catch (error) {
    console.log('Error while fetching blogs by topic', error)
    throw error
  }
}
export const updateBlogDescription = async (blogId, editedDescription) => {
  const updateBlogUrl = `${BLOG_API_ROUTES.UPDATE_BLOG_DETAILS}`
  console.log(updateBlogUrl, 'url')
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not found')
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const requestBody = {
      blogId: blogId,
      blogDescription: editedDescription,
    }

    const updateResponse = await axios.put(updateBlogUrl, requestBody, config)
    //console.log('updateResponse', updateResponse)
    return updateResponse.data
  } catch (error) {
    console.log('Error while updating blog description:', error)
    throw error
  }
}

export const approveBlog = async (blogId) => {
  const approveBlogUrl = `${API_BASE_URL}/openAi/blogs/${blogId}/approve`
  //console.log("approveBlogUrl" ,approveBlogUrl)
  try {
    // const token = localStorage.getItem('token')
    // if (!token) {
    //   throw new Error('Token not found')
    // }

    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }

    const statusResponse = await axios.put(approveBlogUrl, {})

    if (statusResponse.status === 200) {
      //console.log('Blog approved successfully')
      return statusResponse.data
    } else {
      console.error('Failed to approve blog:', statusResponse.statusText)
      throw new Error(statusResponse.statusText)
    }
  } catch (error) {
    console.error('Error approving blog:', error.message)
    throw error
  }
}

export const getBlogStatusByTopic = async (topic) => {
  const statusUrl = `${BLOG_API_ROUTES.GET_BLOG_STATUS}/${topic}`
  try {
    // const token = localStorage.getItem('token')
    // if (!token) {
    //   throw new Error('Token not found')
    // }
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
    const statusResponse = await axios.get(statusUrl)
    //console.log(statusResponse.data);
    return statusResponse.data
  } catch (error) {
    console.log('Error while fetching blogs status by topic', error)
    throw error
  }
}

export const getRecentBlog = async () => {
  const recentBlogUrl = `${BLOG_API_ROUTES.RECENT_BLOG}`
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not found')
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const recentBlog = await axios.get(recentBlogUrl, config)
    console.log(recentBlog, 'rblog')
    return recentBlog
  } catch (error) {
    console.log('Error while fetching recent blog according to publish date', error)
    throw error
  }
}

export const schedulePostTime = async (postScheduleData) => {
  const scheduleBlogUrl = `${BLOG_API_ROUTES.SCHEDULE_BLOG_POST_TIME}`
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not found')
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }

    const schedulePostResponse = await axios.post(scheduleBlogUrl, postScheduleData, config)
    // console.log(schedulePostResponse, 'schedule response')
    return schedulePostResponse
  } catch (error) {
    console.log('Error while scheduling blog post time', error)
    throw error
  }
}

export const getPostScheduledTime = async () => {
  const getScheduledUrl = `${BLOG_API_ROUTES.GET_SCHEDULED_TIME_BY_USER}`
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not found')
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    const scheduledData = await axios.get(getScheduledUrl, config);
    console.log(scheduledData , "post schedule respose coming")
    return scheduledData;
  } catch (Error) {
    console.log('Error while scheduling blog post time', error)
    throw error
  }
}

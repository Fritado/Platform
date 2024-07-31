import axios from 'axios'
import { API_BASE_URL, BLOG_API_ROUTES } from '../services/APIURL/Apis'
import { fetchPromptDetails } from '../services/PromptService/PromptService'
import { getDomianName } from '../services/BusinessDomain/domain'

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
    //console.log(response, 'resab')
    return data
  } catch (error) {
    console.log('Error while fetching About Business content from database', error)
    throw error
  }
}

export const fetchOpenAITopics = async (
  aboutBusiness,
  keywords,
  industryType,
  productsAndServices,
  location,
) => {
  const promptDetailsResponse = await fetchPromptDetails()
  const promptDetails = promptDetailsResponse[0]
  const openAISecretKey = process.env.OPENAI_SECRET_KEY
  // console.log('openAISecretKey', openAISecretKey)

  const instruction = `${promptDetails.BlogTopic}`

  // const prompt = `${instruction} Company Information: ${industryInfo}`
  const prompt = `As an SEO and content expert, please provide me with a comprehensive list of blog topics based on the following information, without needing to include the rationale or conclusions.
  1. About Business - ${aboutBusiness}
  2. Industry type - ${industryType}
  3. Keywords - ${keywords}
  4. Product And Services - ${productsAndServices}
  5. Location - ${location}

  `

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
    console.log('Saved', response)
    return response.data
  } catch (error) {
    console.log('Error while Saving Blog Topics content in database', error)
    throw error
  }
}

export const addNewBlogTopic = async (topic) => {
  const addNewTopicUrl = `${BLOG_API_ROUTES.ADD_NEW_TOPIC}`
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
    const newTopicAdded = await axios.post(addNewTopicUrl, { topic }, config)
    return newTopicAdded
  } catch (error) {
    console.log('Error while adding new topics in database', error)
    throw error
  }
}

export const uploadBlogTopics = async (file) => {
  const uploadTopicUrl = `${BLOG_API_ROUTES.UPLOAD_BLOG_TOPICS}`
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not found')
    }
    const formData = new FormData()
    formData.append('file', file)

    const response = await axios.post(uploadTopicUrl, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    // console.log('Upload success:', response.data);
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error uploading image')
  }
}

export const downloadBlogTopicsExcel = async () => {
  const downloadUrl = `${BLOG_API_ROUTES.DOWNLOAD_BLOG_TOPICS}`
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not found')
    }
    const downloadedResponse = await axios.get(downloadUrl, {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return downloadedResponse.data
  } catch (error) {
    console.error('Error downloading Excel file:', error)
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
    //  console.log("blogTopicResponse" , blogTopicResponse.data.data.topics);
    return resBgTpc
  } catch (error) {
    console.log('Error while fetching Blog Topics data', error)
  }
}

export const BlogGenerate = async (topic) => {
  const promptDetailsResponse = await fetchPromptDetails()
  const promptDetails = promptDetailsResponse[0]

  const openAISecretKey = process.env.OPENAI_SECRET_KEY

  //const prompt = `${promptDetails.BlogDescription} - '${topic}'`;
  const prompt = `When writing a professional blog, follow this structured system to ensure quality and SEO optimization:
      Title: Create a catchy and relevant title with primary keywords.
      Introduction: Introduce the topic, explain its relevance, and state what readers will learn.
      Main Content:
      Section 1: Discuss the first main point, provide data, examples, or quotes.
      Section 2: Elaborate on the second main point, use subheadings and bullet points for clarity.
      Section 3: Cover the third main point, include visuals or infographics.
      Conclusion: Summarize key points, offer actionable advice, and include a call-to-action.
      SEO Elements:
      Use primary and secondary keywords naturally.
      Include internal and external links.
      Optimize meta description and alt text for images.
      Proofreading: Check for grammar, spelling, and readability.
      Please generate article on this topic -${topic} based on the above instructions in 2000 words
      Provide articles in HTML Format.
      `

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
    const blogContent = response.data.choices[0].message.content
    // console.log(response.data.choices[0].message.content, 'content')
    return blogContent
  } catch (error) {
    console.error('Error:', error)
  }
}

//save blog description with its topic and image

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

    const BlogResponse = await axios.post(saveBlogUrl, requestBody, config)
    return BlogResponse.data
  } catch (error) {
    console.log('Error while Saving Blog Details in database', error)
    throw error
  }
}

export const checkBlogAvailability = async () => {
  const checkUrl = `${BLOG_API_ROUTES.CHECK_BLOGS}`
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
    //const missingTopics = "The Role of the White House in Shaping National Policies"
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
    //console.log('blogDetailsResponse', blogDetailsResponse)
    return blogDetailsResponse.data
  } catch (error) {
    console.log('Error while fetching blogs by topic', error)
    throw error
  }
}

export const updateBlogDescription = async (blogId, editedDescription) => {
  const updateBlogUrl = `${BLOG_API_ROUTES.UPDATE_BLOG_DETAILS}`
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
  const approveBlogUrl = `${API_BASE_URL}/api/openAi/blogs/${blogId}/approve`
  // console.log("approveBlogUrl" ,approveBlogUrl)
  try {
    const statusResponse = await axios.put(approveBlogUrl, {})

    if (statusResponse.status === 200) {
      // console.log('Blog approved successfully')
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
  const statusUrl = `${BLOG_API_ROUTES.GET_BLOG_STATUS}/${encodeURIComponent(topic)}`
  try {
    const statusResponse = await axios.get(statusUrl)
    return statusResponse.data
  } catch (error) {
    //console.log('Error while fetching blogs status by topic', error)
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
    const scheduledData = await axios.get(getScheduledUrl, config)
    console.log(scheduledData, 'post schedule respose coming')
    return scheduledData
  } catch (error) {
    console.log('Error while scheduling blog post time', error)
    throw error
  }
}

//upload blog image
export const uploadBlogImage = async (blogId, file) => {
  const uploadUrl = `${BLOG_API_ROUTES.UPLOAD_IMAGE}/${blogId}/upload-image`
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not found')
    }
    const formData = new FormData()
    formData.append('imageFiles', file)

    const response = await axios.post(uploadUrl, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error uploading image')
  }
}

//select blog image
export const selectBlogImageById = async (blogId, imagePath) => {
  const selectImageUrl = `${BLOG_API_ROUTES.SELECT_IMAGE}`
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

    const selectedBlogImage = await axios.put(selectImageUrl, { blogId, imagePath }, config)
    console.log(selectedBlogImage, 'selectedBlogImage')
  } catch (error) {
    console.log('Error while updating selected blog image in db', error)
    throw error
  }
}
//check and save blogImage in db
export const saveBlogImage = async (blogId, blogImage = null) => {
  const saveImageUrl = `${BLOG_API_ROUTES.SAVE_BLOG_IMAGE}`
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

    const saveBlogImage = await axios.post(saveImageUrl, { blogId, blogImage }, config)
    console.log('Response from saving blog image:', saveBlogImage.data)
    return saveBlogImage.data
  } catch (error) {
    console.log('Error while saving blog image in db', error)
    throw error
  }
}

//image generate using open ai
export const generateImage = async (topic, blogContent) => {
  const openAISecretKey = process.env.OPENAI_SECRET_KEY
  const prompt = `{
      "prompt": "Image Generation Prompt for Blog:
      "Create a professional image that aligns with the blog's content and topic. Use the following details for guidance:
      Blog Title:${topic}    
      Blog Content Overview: ${blogContent}
      Consider the following elements when designing the image:
      Theme and Subject Matter: Capture the main theme and subject of the blog. Focus on visual elements that reflect the core message and topic. 
      Tone and Style: The image should match the tone of the blog (e.g., formal, casual, inspirational, informative). Choose an appropriate artistic style (e.g., clean and modern, colorful and dynamic).
      Key Visual Elements: Include any specific elements mentioned in the blog content (e.g., relevant objects, people, settings).
      Color Scheme: Use a color palette that complements the blog's design and enhances readability.
      Typography and Text: If including text, ensure it is legible and enhances the visual appeal without overpowering the main elements.
      Ensure the final image is visually appealing, relevant, and professional, enhancing the overall reader experience."
    }`

  const data = {
    model: 'dall-e-3',
    prompt: prompt,
    n: 1,
    size: '1792x1024',
  }

  const url = 'https://api.openai.com/v1/images/generations'

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openAISecretKey}`,
      },
    })

    const imageUrl = response.data.data[0].url
    console.log(imageUrl, 'Generated Image URL')
    return imageUrl
  } catch (error) {
    console.error('Error:', error)
  }
}

// function to handle image generation and saving
export const handleBlogImage = async (blogId, topic, blogContent) => {
  try {
    const generatedImageUrl = await generateImage(topic, blogContent)
    console.log('Generated blog image URL:', generatedImageUrl)

    // Save the generated image in the database
    const saveResponse = await saveBlogImage(blogId, generatedImageUrl)
    console.log(saveResponse, 'saveResponse handleBlogImage')
    return saveResponse.data.imagePath
  } catch (error) {
    console.error('Error in handling blog image:', error)
    throw error
  }
}

// const temp = await generateImage("The Importance of Animation Studios in Visual Content Creation" , "Animation studios play a crucial role in the creation of visual content for various industries. In today digital age, where attention spans are shorter and competition is fierce, incorporating animation into marketing strategies has become essential. In this blog post, we will explore the significance of animation studios in visual content creation and how they contribute to engaging audiences and driving business growth.");
// console.log(temp , "temp")

// force post blog on wordress website
export const publishBlogtoWordpress = async (blogId) => {
  const publish_url = `${BLOG_API_ROUTES.PUBLISH_BLOG}`
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const websiteName = await getDomianName(token)
    const { fullUrl } = websiteName

    const publishBlogResponse = await axios.post(publish_url, {
      blogId: blogId,
      wordpressUrl: `${fullUrl}/wp-admin/admin-post.php?action=fritadoai_submit_article`,
    })
    if (publishBlogResponse.status === 200) {
      console.log(publishBlogResponse.data.message, 'publishBlogResponse');
      return publishBlogResponse.data.message;
    } else {
      console.error('Error publishing blog:', publishBlogResponse.data.message);
      throw new Error(publishBlogResponse.data.message);
    }
  
  } catch (error) {
    console.error('Error publishing blog:', error)
    throw new Error('Failed to publish blog')
  }
}

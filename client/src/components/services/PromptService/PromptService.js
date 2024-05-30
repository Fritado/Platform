import axios from 'axios'
import { PROMPT_API } from '../APIURL/Apis'

export const savePromptData = async (requestBody) => {
  const saveUrl = `${PROMPT_API.SAVE_PROMPTS}`
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

    const savedPromptData = await axios.post(saveUrl, requestBody, config)
    console.log('prompt response from promptService', savedPromptData)
  } catch (error) {
    console.log('Error while Saving prompts in database', error)
    throw error
  }
}

export const fetchPromptDetails = async () => {
  const getUrl = `${PROMPT_API.GET_PROMPTS}`
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
    const promptDetails = await axios.get(getUrl, config)
    //console.log(promptDetails, 'promptDetails')
    return promptDetails.data.data
  } catch (error) {
    console.log('Error while getting prompts from  database', error)
    throw error
  }
}

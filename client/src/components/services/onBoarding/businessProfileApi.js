import axios from 'axios'
import { BUSINESS_PROFILE_ROUTES } from '../APIURL/Apis'

export const saveAndUpdateBusinessProfile = async (companyName, aboutBusiness, token) => {
  const updateBusinessProfileUrl = `${BUSINESS_PROFILE_ROUTES.UPDATE_BP}`

  const createbusinessProfileUrl = `${BUSINESS_PROFILE_ROUTES.SAVE_BP}`
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const requestBody = {
    companyName,
    aboutBusiness,
  }

  try {
    if (!token) {
      throw new Error('Token not found')
    }
    const aboutBusinessSave = await axios.put(updateBusinessProfileUrl, requestBody, config)
    console.log('aboutBusinessSave', aboutBusinessSave)
    return aboutBusinessSave
  } catch (error) {
    console.log('Error in Business Profile', error)
  }
}

export const saveBusinessInfo = async (companyName, industryType, token) => {
  const saveBusinessInfoUrl = `${BUSINESS_PROFILE_ROUTES.SAVE_BUSINESS_INFO}`
  //const updateBusinessInfoUrl = `${BUSINESS_PROFILE_ROUTES.UPDATE_BUSINESS_INFO}`

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const requestBody = {
    companyName,
    industryType,
  }
  try {
    if (!token) {
      throw new Error('Token not found')
    }
    const res = await axios.post(saveBusinessInfoUrl, requestBody, config)
    // console.log('res', res)
  } catch (error) {
    console.log('Error in Business Info', error)
  }
}

export const createAndSaveLocation = async (location, token) => {
  const locationUrl = `${BUSINESS_PROFILE_ROUTES.CREATE_LOCATION}`
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const requestBody = {
    location,
  }

  try {
    if (!token) {
      throw new Error('Token not found')
    }
    await axios.post(locationUrl, requestBody, config)
  } catch (error) {
    console.log('Error in saving location', error)
  }
}

export const createAndSaveProductAndService = async (productAndServices, token) => {
  const productAndServiceUrl = `${BUSINESS_PROFILE_ROUTES.CREATE_PRODUCT_AND_SERVICE}`
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const requestBody = {
    productAndServices,
  }

  try {
    if (!token) {
      throw new Error('Token not found')
    }
    await axios.post(productAndServiceUrl, requestBody, config)
  } catch (error) {
    console.log('Error in saving Product And Service', error)
  }
}

export const updateSingleProductService = async (oldService, newService) => {
  const editUrl = `${BUSINESS_PROFILE_ROUTES.UPDATE_SINGLE_PRODUCT_AND_SERVICE}`

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

    await axios.put(editUrl, { oldService, newService }, config)
  } catch (error) {
    console.error('Error updating keyword:', error)
  }
}

//DELETE Each single service
export const deleteProductService = async (serviceToDelete) => {
  const deletePD = `${BUSINESS_PROFILE_ROUTES.DELETE_PRODUCT_AND_SERVICE}`
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

    await axios.delete(deletePD, {
      headers: config.headers,
      data: { serviceToDelete },
    })
  } catch (error) {
    console.error('Error deleting Product and service:', error)
  }
}

// create each service
export const addNewService = async (newService) => {
  const addServiecUrl = `${BUSINESS_PROFILE_ROUTES.CREATE_sINGLE_PRODUCT_AND_SERVICE}`
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
    const payload = { newService };
    const newServiceRes = await axios.post(addServiecUrl,  payload, config)
    
   // return newServiceRes
  } catch (error) {
    console.error('Error saving new Product and service:', error)
  }
}

export const getAboutBusinessProfile = async (token) => {
  const getAboutBusinessUrl = `${BUSINESS_PROFILE_ROUTES.GET_ABOUT_BP}`
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    if (!token) {
      throw new Error('Token not found')
    }

    const response = await axios.get(getAboutBusinessUrl, config)
    // console.log('response from bApi', response)
    return response.data.data
  } catch (error) {
    console.error('Error while fetching about Business data', error)
    return null
  }
}

export const getProductService = async (token) => {
  const getServiceUrl = `${BUSINESS_PROFILE_ROUTES.GET_PRODUCT_AND_SERVICE}`

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

    const Pdresponse = await axios.get(getServiceUrl, config)
    //console.log(' Pdresponse',Pdresponse.data.data.productAndServices)
    return Pdresponse.data.data.productAndServices
  } catch (error) {
    console.error('Error while fetching Service data', error)
    return []
  }
}

export const deleteEachLocation = async(locationName)=>{
  const deleteLocationUrl = `${BUSINESS_PROFILE_ROUTES.DELETE_SINGLE_LOCATION}`;
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token not found')
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { locationName }, 
    }
   
    const deleteResponse = await axios.delete( deleteLocationUrl ,config);
   
  } catch (error) {
    console.error('Error deleting Location', error)
  }

}

export const getLocation = async (token) => {
  const getLocationUrl = `${BUSINESS_PROFILE_ROUTES.GET_LOCATION}`;

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

    const Locationresponse = await axios.get(getLocationUrl, config)
    //console.log('Locationresponse ',Locationresponse)
    return Locationresponse.data.data.location
  } catch (error) {
    console.error('Error while fetching Service data', error)
    return []
  }
}


export const addNewLocation = async(locationName)=>{
  const addLocUrl = `${BUSINESS_PROFILE_ROUTES.CREATE_SINGLE_LOCATION}`;

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
    const payload = { locationName};
    const newLocationRes = await axios.post(addLocUrl,  payload, config)
    
   // return newLocationRes
  } catch (error) {
    console.error('Error saving new Product and service:', error)
  }

}

export const updateEachLocation = async( oldLocation, newLocation) =>{
  const updateLocUrl = `${BUSINESS_PROFILE_ROUTES.UPDATE_SINGLE_LOCATION}`;
  
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

    const updatedLocation = await axios.put(updateLocUrl,{ oldLocation, newLocation} ,config)
   // console.log('updatedLocation ',updatedLocation);
    
  } catch (error) {
    console.error('Error while fetching Service data', error)
    
  }
}
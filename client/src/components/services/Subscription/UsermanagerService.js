import axios from 'axios'
import { USER_MANAGER } from '../APIURL/Apis'

export const fetchUserInfo = async () => {
  const fetchUrl = `${USER_MANAGER.FETCH_USER_INFO}`
  try {
    const userResponse = await axios.get(fetchUrl)
    const userData = userResponse.data;
   // console.log('userResponse', userData);
    return userData;
  } catch (error) {
    console.log('Error while fetching user details', error)
  }
}

//date format function
export const formatDate = (dateString) =>{
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', {month:'short'})
    const year = date.getFullYear().toString().slice(-2);
    return `${day} ${month} ${year}`;
}
import axios from 'axios'
import { ADMIN_PACKAGE_MANAGER } from '../APIURL/Apis'

export const savePackage = async (packageData) => {
  const saveUrl = `${ADMIN_PACKAGE_MANAGER.CREATE_PACKAGE}`
  try {
    const packageSaved = await axios.post(saveUrl, packageData)
    // console.log(packageSaved, 'packageSaved')
    return packageSaved
  } catch (error) {
    console.log('error while saving package from frontend', error)
  }
}

export const fetchAllPackages = async () => {
  const getUrl = `${ADMIN_PACKAGE_MANAGER.GETALL_PACKAGE}`
  try {
    const packagesResponse = await axios.get(getUrl)
    // console.log('Pacakage response ', packagesResponse)
    return packagesResponse.data
  } catch (error) {
    console.log('Error while fetching all packages from backend ', error)
  }
}

export const packageUpdate = async (packageId, packageData) => {
  const updateUrl = `${ADMIN_PACKAGE_MANAGER.UPDATE_PACKAGE}/${packageId}`
  try {
    const packageUpdated = await axios.put(updateUrl, packageData)
    // console.log('Package updated', packageUpdated);
    return packageUpdated
  } catch (Error) {
    console.log('Error while updating package from frontend ', Error)
    throw error;
  }
}

export const packageDelete = async (packageId) => {
  const deleteUrl = `${ADMIN_PACKAGE_MANAGER.DELETE_PACKAGE}/${packageId}`
  try {
    const packageDeleted = await axios.delete(deleteUrl)
    // console.log('Package deleted', packageDeleted);
    return packageDeleted
  } catch (Error) {
    console.log('Error while deleting package from frontend ', Error)
  }
}

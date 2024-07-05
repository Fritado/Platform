const express = require('express')
const router = express.Router()

const {
  saveLocation,
  updateSingleLocation ,
  deleteSingleLocationItem,
  getLocation,
  createSingleLocation,
} = require('../controllers/BusinessProfile/Location');

const {
  saveProductsAndServices,
  updateProductAndService,
  getProductsAndServices,
  deleteProductAndServices,
  updateSingleProductAndService,
  createSingleService,
} = require('../controllers/BusinessProfile/ProductAndServices')
const {
  saveBusinessProfile,
  updateBusinessProfile,
  getBusinessProfile,
  updateCompanyAndIndustry,
  saveCompanyAndIndustry,
} = require('../controllers/BusinessProfile/BusinessProfile')
const {
  saveKeyword,
  updateKeyword,
  getKeywords,
  deleteKeyWord,
  updateSingleKeyword,
  createSingleKeyword,
} = require('../controllers/BusinessProfile/KeyWord')
const { auth } = require('../middlewares/auth')

router.post('/create-businessProfile', auth, saveBusinessProfile)
router.put('/update-businessProfile', auth, updateBusinessProfile)
router.get('/get-businessProfile', auth, getBusinessProfile)


router.post('/save-businessinfo', auth, saveCompanyAndIndustry)
router.put('/update-businessinfo', auth, updateCompanyAndIndustry)


router.post('/create-location', auth, saveLocation)
router.put('/update-location-name', auth, updateSingleLocation)
router.get('/get-location', auth, getLocation)
router.delete('/delete/location-item' , auth ,deleteSingleLocationItem)
router.post('/create/new-location', auth ,  createSingleLocation);


router.post('/create-product&services', auth, saveProductsAndServices)
router.post('/create-single-product&services', auth, createSingleService)
router.put('/update-product-service', auth, updateProductAndService)
router.get('/get-product-service', auth, getProductsAndServices)
router.delete('/delete-product-service', auth, deleteProductAndServices)
router.put('/update-single-product-service', auth, updateSingleProductAndService)



router.post('/save-keywords', auth, saveKeyword)
router.post('/create-single-keywords', auth, createSingleKeyword)
router.put('/update-keywords', auth, updateKeyword)
router.get('/get-keywords', auth, getKeywords)
router.delete('/delete-keyword', auth, deleteKeyWord)
router.put('/update-single-keyword', auth, updateSingleKeyword)

module.exports = router

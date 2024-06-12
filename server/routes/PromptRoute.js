const express = require('express')
const router = express.Router()

const { saveOrUpdatePrompt,getPrompts  } = require('../controllers/PromptInfo/Prompts')


router.post('/save-prompt-details', saveOrUpdatePrompt)
router.get('/fetch-prompt-details',  getPrompts)

module.exports = router

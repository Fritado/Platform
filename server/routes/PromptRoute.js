const express = require('express')
const router = express.Router()

const { saveOrUpdatePrompt,getPrompts  } = require('../controllers/PromptInfo/Prompts')
const { auth } = require('../middlewares/auth')

router.post('/save-prompt-details',auth , saveOrUpdatePrompt)
router.get('/fetch-prompt-details',  getPrompts)

module.exports = router

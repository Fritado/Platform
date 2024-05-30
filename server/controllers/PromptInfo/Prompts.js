const User = require('../../models/User')
const Prompt = require('../../models/Prompt/Prompt')

// update and save function to save the prompt coming from frontend
exports.saveOrUpdatePrompt = async (req, res) => {
  try {
    const { BusinessDetails, Keyword, ProductAndService, Location, BlogTopic, BlogDescription } =
      req.body
    const userId = req.user.id

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    const savedPrompt = await Prompt.findOneAndUpdate(
      { user: userId },
      {
        user: userId,
        BusinessDetails,
        Keyword,
        ProductAndService,
        Location,
        BlogTopic,
        BlogDescription,
      },
      { new: true, upsert: true }, // new: return the updated document, upsert: create if not exists
    )

    return res.status(200).json({
      success: true,
      message: 'Prompt saved or updated successfully',
      data: savedPrompt,
    })
  } catch (error) {
    console.error("Internal server error, can't save or update prompt", error)
    return res.status(500).json({
      success: false,
      message: 'Error in saving or updating prompt',
      error: error.message,
    })
  }
}

//get function to fetch all prompts desc from db
exports.getPrompts = async (req, res) => {
  try {
    
    const prompts = await Prompt.find()

    return res.status(200).json({
      success: true,
      message: 'Prompts fetched successfully',
      data: prompts,
    })
  } catch (error) {
    console.error("Internal server error, can't fetch prompts", error)
    return res.status(500).json({
      success: false,
      message: 'Error in fetching prompts',
      error: error.message,
    })
  }
}

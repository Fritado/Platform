const User = require('../../models/User')
const Prompt = require('../../models/Prompt/Prompt')

// update and save function to save the prompt coming from frontend
exports.saveOrUpdatePrompt = async (req, res) => {
  try {
    const { BusinessDetails, Keyword, ProductAndService, Location, BlogTopic, BlogDescription } =
      req.body
      let sharedPrompt = await Prompt.findOne({}); 
   
      if (!sharedPrompt) {
        // If prompt doesn't exist, create it
        sharedPrompt = new Prompt({
          BusinessDetails,
          Keyword,
          ProductAndService,
          Location,
          BlogTopic,
          BlogDescription,
        });
       } else {
          // If prompt exists, update it
          sharedPrompt.BusinessDetails = BusinessDetails;
          sharedPrompt.Keyword = Keyword;
          sharedPrompt.ProductAndService = ProductAndService;
          sharedPrompt.Location = Location;
          sharedPrompt.BlogTopic = BlogTopic;
          sharedPrompt.BlogDescription = BlogDescription;
        }
    
        // Save the updated or created prompt object
        await sharedPrompt.save();

    return res.status(200).json({
      success: true,
      message: 'Prompt saved or updated successfully',
      data:sharedPrompt,
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

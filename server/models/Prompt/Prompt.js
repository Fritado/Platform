const mongoose = require('mongoose')

const promptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  BusinessDetails: {
    type: String,
  },
  Keyword: {
    type: String,
  },
  ProductAndService: {
    type: String,
  },
  Location: {
    type: String,
  },
  BlogTopic: {
    type: String,
  },
  BlogDescription: {
    type: String,
  },
})

const Prompt = mongoose.model('Prompt', promptSchema)

module.exports = Prompt

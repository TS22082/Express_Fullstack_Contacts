const mongoose = require('mongoose')

// create schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String
  }
})

module.exports = mongoose.model('Contact', contactSchema)

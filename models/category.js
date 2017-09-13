const mongoose = require('mongoose')

// category Schema
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  filter: {
    type: Object
  },
  create_date: {
    type: Date,
    default: Date.now
  }
})

const Caregory = (module.exports = mongoose.model('Genre', categorySchema))

module.exports.Caregory = Caregory

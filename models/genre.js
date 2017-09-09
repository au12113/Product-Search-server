const mongoose = require('mongoose')

// Genre Schema
const genreSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  done: {
    type: Boolean
  },
  create_date: {
    type: Date,
    default: Date.now
  }
})

const Genre = (module.exports = mongoose.model('Genre', genreSchema))

module.exports.Genre = Genre

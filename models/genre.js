const mongoose = require('mongoose')

// Genre Schema
const genreSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  create_date: {
    type: Date,
    default: Date.now
  }
})

const Genre = (module.exports = mongoose.model('Genre', genreSchema))

module.exports.Genre = Genre

// get genres
module.exports.getGenres = function(callback, limit) {
  Genre.find(callback).limit(limit)
}

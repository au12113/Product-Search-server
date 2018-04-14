const mongoose = require('mongoose')

const NotebooksSchema = mongoose.Schema({
  brand: String,
  model: String,
  images: [String],
  feature: Array,
  price_currency: String,
  url: String,
  price: String,
  seller: String,
  currency: String,
  condition: String,
  firstrecorded_at: Number
})

module.exports = mongoose.model('Notebooks', NotebooksSchema)

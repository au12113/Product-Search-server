const mongoose = require('mongoose')

const newProductSchema = mongoose.Schema({
  brand: { type: String },
  model: { type: String },
  features: Object,
  price: Number,
  condition: String,
  url: String,
  seller: String
})

module.exports = mongoose.model('NewProducts',newProductSchema)
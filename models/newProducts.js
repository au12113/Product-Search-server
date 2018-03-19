const mongoose = require('mongoose')

const newProductSchema = mongoose.Schema({
  brand: { type: String },
  model: { type: String },
  category: { type: String },
  price: Number,
  specs: [{
    specName: String,
    subDetail: [{
      name: String,
      detail: [String]
    }]
  }]
})

module.exports = mongoose.model('NewProducts',newProductSchema)
const mongoose = require('mongoose')

const newProductSchema = mongoose.Schema({
  brand: String,
  model: String,
  category: String,
  price: Number,
  specs: [{
    specName: String,
    subDetail: [{
      name: String,
      detail: [String]
    }]
  }]
})
const NewProducts = (module.exports = mongoose.model('newproducts', newProductSchema))

module.exports.NewProducts = NewProducts

const mongoose = require('mongoose')

const newProductSchema = mongoose.Schema({
  brand: String,
  model: String,
  catagory:  String,
  price: Number,
  spec: [{
    specName: {
      type: String
    },
    subDetail: [{
      name: String,
      detail: []
    }]
  }]
})
const NewProducts = (module.exports = mongoose.model('newproducts', newProductSchema))

module.exports.NewProducts = NewProducts

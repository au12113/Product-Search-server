const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  company: {
    type: String,
    require: true
  },
  type_main: String,
  type: String,
  details: String,
  url: String,
  warranty: String,
  price: String
})
const Products = (module.exports = mongoose.model('products', productSchema))

module.exports.Products = Products

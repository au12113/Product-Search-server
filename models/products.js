const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  category: {
    type: String,
    require: true
  },
  subCategory: String,
  mainDetail: String,
  imageUrl: String,
  price: Number
})

const Products = (module.exports = mongoose.model('products', productSchema))

module.exports.Products = Products

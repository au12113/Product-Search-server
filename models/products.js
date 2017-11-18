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
productSchema.index({ name: 'text', brand: 'text' }, {name: 'myIndex', weights: {name: 5, brand: 3}})
const Products = (module.exports = mongoose.model('products', productSchema))

module.exports.Products = Products

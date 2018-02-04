const mongoose = require('mongoose')

const newproductSchema = mongoose.Schema({
  brand: {
    type: String
  },
  model: {
    type: String
  },
  type: {
    type: String
  },
  price: Number,
  spec: [{
    specName: {
      type: String
    },
    subDetail: [{
      name: String,
      detail: ["LGA1151"]
    }]
  }]
})
const NewProducts = (module.exports = mongoose.model('newProducts', newproductSchema))

module.exports.NewProducts = NewProducts

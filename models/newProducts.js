const mongoose = require('mongoose')
const mongoosastic = require('mongoosastic')

const newProductSchema = mongoose.Schema({
  brand: { type: String, es_indexed:true },
  model: { type: String, es_indexed:true },
  category: { type: String, es_indexed:true },
  price: Number,
  specs: [{
    specName: String,
    subDetail: [{
      name: String,
      detail: [String]
    }]
  }]
})

newProductSchema.plugin(mongoosastic)
module.exports = mongoose.model('NewProducts',newProductSchema)
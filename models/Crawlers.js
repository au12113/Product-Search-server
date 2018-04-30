const mongoose = require('mongoose')

const CrawlersSchema = mongoose.Schema({
  brand: String,
  name: String,
  features: Object,
  url: String,
  price: Number,
  website: String
})

module.exports = mongoose.model('Crawlers', CrawlersSchema)

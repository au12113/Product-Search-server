var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var cors = require('cors')

app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://<au12113>:<W45up0nt>@ds115124.mlab.com:15124/heroku_g1mlp3dj' // 'mongodb://localhost/product'

mongoose.connect(MONGODB_URI, {
  user: 'au12113',
  pass: 'W45up0nt'
})

const Products = require('./models/products').Products
const NewProducts = require('./models/newProducts').NewProducts

app.use(cors({ origin: 'http://localhost:8080' }))

app.get('/', function (req, res) {
  res.send('Please use /api/product')
})

app.get('/newapi/product', (req, res) => {
  NewProducts.find().exec((err, product) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    console.log(req)
    res.jsonp(product)
  })
})

app.get('/newapi/product/id/:productID', (req, res) => {
  NewProducts.find({_id: req.params.productID}).exec((err, product) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    res.jsonp(product)
  })
})

app.get('/api/product', (req, res) => {
  Products.find().exec((err, product) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    console.log(req)
    res.jsonp(product)
  })
})

app.get('/api/product/id/:productID', (req, res) => {
  Products.find({_id: req.params.productID}).exec((err, product) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    res.jsonp(product)
  })
})

app.get('/api/products/:find', (req, res) => {
  Products.find(
    {$text: { $search: req.params.find }},
    // { '_id': 0, 'url': 0, score: { $meta: 'textScore' } }
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } }).exec((err, product) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    res.jsonp(product)
  })
})

app.listen(PORT, '0.0.0.0')
console.log(`Running on port ${PORT}`)

var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var cors = require('cors')

var app = express()

app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb://<au12113>:<W45up0nt>@ds115124.mlab.com:15124/heroku_g1mlp3dj'

mongoose.connect(MONGODB_URI, {
  user: 'au12113',
  pass: 'W45up0nt'
})

var NewProducts = require('./models/newProducts')
var Notebooks = require('./models/Notebooks')

app.use(
  cors({
    origin: 'http://localhost:8000'
  })
)

app.get('/', function(req, res) {
  res.send('Please use /api/products or /api/product/:productID')
})

app.get('/field', function(req, res) {
  Notebooks.find().exec((err, products) => {
    var count = 0
    var filter = Object.keys(products[0]._doc.features)
    // console.log(Object.keys(products[0]._doc.features))
    // for (var i = 0; i < products.length; i++) {
    //   if (Object.keys(products[0]._doc.features).length > 0) {
    //     count++
    //   }
    // }
    // var result = { All: products.length, hasSpec: count }
    res.jsonp(filter)
  })
  // console.log(Object.keys(obj))
})

app.get('/filter', function(req, res) {
  NewProducts.distinct('store').exec((err, filter) => {
    res.jsonp(filter)
  })
})

app.get('/api/products', (req, res) => {
  NewProducts.find().exec((err, product) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    // console.log(req)
    res.jsonp(product)
  })
})

app.get('/api/product/id/:productID', (req, res) => {
  NewProducts.find({
    _id: req.params.productID
  }).exec((err, product) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    res.jsonp(product)
  })
})

app.get('/api/sales/:pharse', (req, res) => {
  NewProducts.find(
    {
      $text: {
        $search: req.params.pharse
      }
    },
    {
      store: 1,
      price: 1,
      url: 1
    }
  ).exec((err, product) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    res.jsonp(product)
  })
})

app.get('/api/search/category/:category', (req, res) => {
  NewProducts.find({
    $text: {
      $search: req.params.category
    }
  }).exec((err, product) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    res.jsonp(product)
  })
})

app.listen(PORT, '0.0.0.0')
console.log(`Running on port ${PORT}`)

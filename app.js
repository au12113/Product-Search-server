var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var cors = require('cors')
var fs = require('fs')

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
  //get all value by key
  // Notebooks.distinct('features.Graphics').exec((err, filter) => {
  //   res.jsonp(filter)
  // })
  Notebooks.find().exec((err, products) => {
    var filters = {}
    var filterKeys = Object.keys(products[0]._doc.features)
    for (var i = 0; i < filterKeys.length; i++) {
      filters[filterKeys[i]] = []
    }
    for (var i = 0; i < products.length; i++) {
      for (
        var featureIndex = 0;
        featureIndex < filterKeys.length;
        featureIndex++
      ) {
        var feature = filterKeys[featureIndex]
        if (products[i]._doc.features[feature] !== undefined) {
          for (
            var subDetail = 0;
            subDetail < products[i]._doc.features[feature].length;
            subDetail++
          ) {
            if (
              filters[feature].indexOf(
                products[i]._doc.features[feature][subDetail]
              ) === -1
            ) {
              filters[feature].push(
                products[i]._doc.features[feature][subDetail]
              )
            }
          }
        }
      }
    }
    fs.writeFileSync('./backupData/test.json', JSON.stringify(filters))
    res.json(filters)
  })
})

app.get('/filter', function(req, res) {
  console.log(req.query)
  var queryObject = {}
  if(req.query.brand !== undefined)
  {
    queryObject.brand = req.query.brand
  }
  if(req.query.price !== undefined)
  {
    queryObject.price = {$lt: req.query.price}
  }
  // if(req.query.brand !== undefined)
  // {
  //   queryObject.push({brand: req.query.brand})
  // }
  Notebooks.find(queryObject).exec((err, results) => {
    console.log(results.length)
    res.jsonp(results)
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

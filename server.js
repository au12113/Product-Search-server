var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var {
  performance
} = require('perf_hooks')
var cors = require('cors')
var fs = require('fs')
// var resourceMonitorMiddleware = require('express-watcher').resourceMonitorMiddleware

var Products = require('./models/Products')
var NewProducts = require('./models/newProducts')
var Notebooks = require('./models/Notebooks')

var app = express()

const PORT = process.env.PORT || 3000
const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb://<au12113>:<W45up0nt>@ds115124.mlab.com:15124/heroku_g1mlp3dj'
mongoose.connect(MONGODB_URI, {
  user: 'au12113',
  pass: 'W45up0nt'
})
mongoose.set('debug', true)

app.use(bodyParser.json())
// app.use(resourceMonitorMiddleware)
app.use(
  cors({
    origin: 'http://localhost:8000'
  })
)

app.get('/', function (req, res) {
  res.send('Please use /api/products or /api/product/:productID')
})

app.get('/npddb/products', (req, res) => {
  console.time('new products with limit and skip')
  NewProducts.find().limit(2).skip(2).exec((err, result) => {
    res.status(200).jsonp(result)
    console.timeEnd('new products with limit and skip')
  })
})

app.get('/nbdb/products', (req, res) => {
  console.time('notebooks with limit and skip')
  Notebooks.find().exec((err, product) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    res.status(200).jsonp(product)
    console.time('notebooks with limit and skip')
  })
})

app.get('/npddb/api/sales/', (req, res) => {
  NewProducts.find({
    model: req.query.model
  }, {
    seller: 1,
    price: 1,
    url: 1
  }).exec((err, product) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    res.status(200).jsonp(product)
    // console.timeEnd("task")
  })
})

app.get('/nbdb/field', function (req, res) {
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
        var featureIndex = 0; featureIndex < filterKeys.length; featureIndex++
      ) {
        var feature = filterKeys[featureIndex]
        if (products[i]._doc.features[feature] !== undefined) {
          for (
            var subDetail = 0; subDetail < products[i]._doc.features[feature].length; subDetail++
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

app.get('/nbdb/filter', function (req, res) {
  console.time("task")
  var queryObject = {}
  if (req.query.brand !== undefined) {
    queryObject.brand = {
      $in: req.query.brand
    }
  }
  if (req.query.price !== undefined) {
    queryObject.price = {
      $lt: req.query.price
    }
  }
  if (req.query.OS !== undefined) {
    queryObject["features.OS"] = {
      $in: [req.query.OS]
    }
  }
  if (req.query.screen !== undefined) {
    queryObject["features.screen"] = {
      $in: [req.query.screen]
    }
  }
  if (req.query.pharse !== undefined) {
    queryObject["$text"] = {
      $search: req.query.pharse
    }
  }
  console.log(req.query.pharse)
  Notebooks.find(queryObject, {
    "score": {
      "$meta": "textScore"
    }
  }).sort({
    "score": {
      "$meta": "textScore"
    }
  }).exec((err, results) => {
    if(err) {
      console.log(err)
      return res.sendStatus(500)
    }
    console.log(results.length)
    res.jsonp(results)
    console.timeEnd("task")
  })
})

// app.get('/nbdb/filter/brand', (req, res) => {
//   Notebooks.distinct('brand').exec((err, result)=>{
//     res.jsonp(result)
//   })
// })

app.get('/api/product/id/:productID', (req, res) => {
  Notebooks.find({
    _id: req.params.productID
  }).exec((err, product) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    res.jsonp(product)
  })
})

app.get('/nbdb/api/sales/:model', (req, res) => {
  Notebooks.find({
    model: req.params.model
    // $text: {
    //   $search: req.params.pharse
    // }
  }, {
    seller: 1,
    price: 1,
    url: 1
  }).exec((err, product) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    res.jsonp(product)
  })
})

app.get('/nbdb/api/search/category/:category', (req, res) => {
  Notebooks.find({
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

var server = app.listen(PORT, '0.0.0.0', () => {
  // console.log(`Running on port ${server.address().port}`)
})

module.exports = server;

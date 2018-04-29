const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const {
  performance
} = require('perf_hooks')
const cors = require('cors')
const fs = require('fs')
var resourceMonitorMiddleware = require('express-watcher').resourceMonitorMiddleware

var Products = require('./models/Products')
var NewProducts = require('./models/newProducts')
var Notebooks = require('./models/Notebooks')

const tools = require('./methods/tools')

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
app.use(resourceMonitorMiddleware)
app.use(
  cors({
    origin: 'http://localhost:8000'
  })
)

app.get('/', function (req, res) {
  res.send('Please use /api/products or /api/product/:productID')
})

app.get('/:db/products', (req, res) => {
  var page = Number(req.query.page)
  var objectPerPage = Number(req.query.perPage)
  mongoose.model(req.params.db).find().limit(objectPerPage).skip(page*objectPerPage).exec((err, result) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    res.status(200).jsonp(result)
  })
})

app.get('/:db/allProducts', (req, res) => {
  mongoose.model(req.params.db).find().exec((err, product) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    res.status(200).jsonp(product)
  })
})

app.get('/:db/api/sales/', (req, res) => {
  mongoose.model(req.params.db).find({
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
  })
})

app.get('/:db/filter', function (req, res) {
  queryObject = tools.getQueryObject(req.query)
  mongoose.model(req.params.db).find(queryObject, {
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
  })
})

app.get('/:db/filterWithStringPrice', function (req, res) {
  queryObject = tools.getQueryObject(req.query)
  mongoose.model(req.params.db).find(queryObject, {
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
    var products = tools.getQueryObjectWithoutPrice(results)
    console.log(products.length)
    res.jsonp(products)
  })
})

app.get('/:db/id/:productID', (req, res) => {
  mongoose.model(req.params.db).find({
    _id: req.params.productID
  }).exec((err, product) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    res.jsonp(product)
  })
})

app.get('/:db/sales/:model', (req, res) => {
  mongoose.model(req.params.db).find({
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

// app.get('/nbdb/api/search/category/:category', (req, res) => {
//   Notebooks.find({
//     $text: {
//       $search: req.params.category
//     }
//   }).exec((err, product) => {
//     if (err) {
//       console.log(err)
//       return res.sendStatus(500)
//     }
//     res.jsonp(product)
//   })
// })

// app.get('/nbdb/field', function (req, res) {
//   Notebooks.find().exec((err, results) => {
//     if(err) {
//       console.log(err)
//       return res.sendStatus(500)
//     }
//     var filters = tools.getFieldKeys(results)
//     res.json(filters)
//   })
// })

var server = app.listen(PORT, '0.0.0.0', () => {
  // console.log(`Running on port ${server.address().port}`)
})

module.exports = server;
